<?php

namespace App\Http\Controllers;

use App\Http\Requests\userRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

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

        $token = auth('api')->login($newUserObj);
        return $this->respondWithToken($token);
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
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
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
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
