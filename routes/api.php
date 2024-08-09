<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\listingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    Route::group(['prefix'=>'listing'],function () {
        Route::get('search-listing', [listingController::class, 'search']);
    });
});

Route::middleware(['auth:api'])->group(function (){
    Route::post('me', [AuthController::class,'me']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::group(['prefix'=>'listing'],function (){
        Route::post('add-new', [listingController::class, 'submit']);
        Route::get('view-listing', [listingController::class, 'view']);
        Route::post('update-listing', [listingController::class, 'update']);
        Route::get('delete-listing', [listingController::class, 'delete']);
    });
});

