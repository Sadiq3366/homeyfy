<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\listingController;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class,'login']);
    Route::post('register', [AuthController::class,'register']);
    Route::get('users', [AuthController::class,'getUser']);
    Route::get('users/{id}', [AuthController::class,'editUserdata']);
    Route::post('update_user/{id}', [AuthController::class,'updateUser']);
    Route::delete('users_delete/{id}', [AuthController::class,'deleteUser']);
    Route::group(['prefix'=>'listing'],function () {
        Route::get('search-listing', [listingController::class, 'search']);
    });
});

Route::middleware(['auth:api'])->group(function (){
    Route::get('check_user',[AuthController::class,'existingUser']);
    Route::post('favorite',[listingController::class,'favorite_listings']);
    Route::get('getFavorite',[listingController::class,'getFavorite']);
    Route::post('me', [AuthController::class,'me']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::group(['prefix'=>'listing'],function (){
        Route::post('add-new', [listingController::class, 'submit']);
        Route::get('view-listing', [listingController::class, 'dashboard_view']);
        Route::get('edit-listing', [listingController::class, 'edit']);
        Route::post('upload-images', [listingController::class, 'images']);
        Route::post('update-listing', [listingController::class, 'update']);
        Route::get('delete-listing', [listingController::class, 'delete']);
    })->middleware(['auth', 'verified']);
});

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verified', function (Request $request) {

    $id = $request->query('id');
    $hash = $request->query('hash');
    $expires = $request->query('expires');
    $signature = $request->query('signature');

    // Validate the signature
    $expectedSignature = hash_hmac('sha256', "{$id}|{$hash}|{$expires}", config('app.key'));

    if (!hash_equals($expectedSignature, $signature)) {
        abort(403, 'Invalid signature.');
    }

    // Check if the link has expired
    if (now()->timestamp > $expires) {
        abort(403, 'Link has expired.');
    }

    // Validate the user
    $user = User::findOrFail($id);

    if (sha1($user->email) !== $hash) {
        abort(403, 'Invalid hash.');
    }

    // Mark the email as verified
    $varified = $user->markEmailAsVerified();

    if($varified){
        return response()->json(['message'=>'Congratulation! Email Verified Successfully, Please Explore website now....']);
    }

})->name('verification.verify');

