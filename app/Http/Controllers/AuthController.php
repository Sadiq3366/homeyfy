<?php

namespace App\Http\Controllers;

use App\Http\Requests\updateUser;
use App\Http\Requests\userRegisterRequest;
use App\Mail\RegisterUserNotify;
use App\Models\User;
use App\Notifications\CustomVerifyEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use mysql_xdevapi\Exception;
use PharIo\Manifest\Email;

/**
 * @OA\Info(
 *      title="Laravel 11 homeyfy APIs Documents",
 *      version="1.0.0.1"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *   path="/api/auth/register",
     *   operationId="Register",
     *   tags={"Register"},
     *   summary="Register API",
     *   description="This is User register API",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  type="object",
     *                  required={"first_name", "last_name", "user_name", "email", "phone", "password", "user_type"},
     *                  @OA\Property(property="first_name", type="string"),
     *                  @OA\Property(property="last_name", type="string"),
     *                  @OA\Property(property="user_name", type="string"),
     *                  @OA\Property(property="email", type="string"),
     *                  @OA\Property(property="phone", type="integer"),
     *                  @OA\Property(property="password", type="string", format="password"),
     *                  @OA\Property(property="password_confirmation", type="string", format="password"),
     *                  @OA\Property(property="user_type", type="string")
     *              )
     *          )
     *      ),
     *      @OA\Response(
     *        response=201,
     *        description="User Registered Successfully",
     *        @OA\JsonContent()
     *      ),
     *      @OA\Response(
     *        response=200,
     *        description="User Registered Successfully",
     *        @OA\JsonContent()
     *      ),
     *      @OA\Response(
     *        response=422,
     *        description="Unprocessable Entity",
     *        @OA\JsonContent()
     *      ),
     *      @OA\Response(
     *        response=400,
     *        description="Bad Request",
     *        @OA\JsonContent()
     *      ),
     *      @OA\Response(
     *        response=404,
     *        description="Resource Not Found",
     *        @OA\JsonContent()
     *      )
     * )
     */

    public function register(userRegisterRequest $request)
    {

        try
        {
            $validatordata = $request->validated();

            $newUserObj = new User();
            $newUserObj->first_name = $validatordata['first_name'];
            $newUserObj->last_name = $validatordata['last_name'];
            $newUserObj->user_name = $validatordata['user_name'];
            $newUserObj->email = $validatordata['email'];
            $newUserObj->email_verified_at = null;
            $newUserObj->phone = $validatordata['phone'];
            $newUserObj->password = bcrypt($validatordata['password']);
            $newUserObj->user_type = $validatordata['user_type'];
            $newUserObj->save();

            // Generate the signed URL for verification
            $id = $newUserObj->id;
            $hash = sha1($newUserObj->email);
            $expires = now()->addMinutes(60)->timestamp;
            $signature = hash_hmac('sha256', "{$id}|{$hash}|{$expires}", config('app.key'));

            // Construct the React app URL with verification parameters
//            $reactAppBaseUrl = 'http://localhost:3000'; // Adjust to your React app URL
            $customVerificationUrl = "{$request->url}/verify-email?id={$id}&hash={$hash}&expires={$expires}&signature={$signature}";

            // Send the custom verification email
            $adminEmail = config('mail.admin_email');
            Notification::send($newUserObj, new CustomVerifyEmail($customVerificationUrl));
            Mail::to($newUserObj->email)->send(new RegisterUserNotify($newUserObj, $newUserObj->user_type));
            Mail::to($adminEmail)->send(new RegisterUserNotify($newUserObj, 'admin'));

            $token = auth('api')->login($newUserObj);
            $this->respondWithToken($token);
            return response()->json([
                'Message'=> 'Registration completed Please verify the email address'
            ]);
        }
        catch(\Exception $e)
        {
            return response()->json([
                'error' => 'Registration failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *   path="/api/auth/login",
     *   operationId="login",
     *   tags={"Login"},
     *   summary="Login API",
     *   description="This is the user login API",
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         type="object",
     *         required={"email", "password"},
     *         @OA\Property(property="email", type="string", format="email"),
     *         @OA\Property(property="password", type="string", format="password")
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Successful login",
     *     @OA\JsonContent(
     *       type="object",
     *       @OA\Property(property="access_token", type="string"),
     *       @OA\Property(property="token_type", type="string"),
     *       @OA\Property(property="expires_in", type="integer")
     *     )
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthorized",
     *     @OA\JsonContent(
     *       type="object",
     *       @OA\Property(property="error", type="string", example="Unauthorized")
     *     )
     *   )
     * )
     */

    public function login()
    {
        try {
            $input = request(['username', 'password']);
            $field = filter_var($input['username'], FILTER_VALIDATE_EMAIL) ? 'email' : 'user_name';
            $credentials = [
                $field => $input['username'],
                'password' => $input['password']
            ];
            if (! $token = auth('api')->attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $this->respondWithToken($token);
            return response()->json([
                'message' => 'Login Successfully Redirecting.....',
                'authToken' => $token,
            ]);
        } catch (\Exception $e){
            return response()->json([
                'error' => 'Login failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 6000
        ]);
    }

    public function getUser()
    {
        return response()->json(User::latest()->get());
    }
    public function deleteUser($id)
    {
        User::whereId($id)->first()->delete();
        return response()->json('Success');
    }
    public function editUserdata($id){
       return response()->json(User::find($id));
    }
    public function updateUser(Request $request ,$id)
    {
        try {

            $user = User::find($id);

            $user->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'user_name' => $request->user_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'user_type' => $request->user_type,
            ]);
            return response()->json("Updated successfully");

        } catch (\Exception $e) {
            return response()->json([
                'Error' => 'Updating Field',
                'Message' => $e->getMessage(),
            ], 500);
        }
    }
    public function existingUser()
    {
        try {
            $user = Auth::user();
            $user_id = $user->id;
            $user_type = $user->user_type;
            return response()->json(['user_id'=>$user_id,'user_type'=>$user_type]);
        } catch (\Exception $e){
            return response()->json([
                'Error' => 'Error',
                'Message' => $e->getMessage(),
            ],500);
        }

    }

}
