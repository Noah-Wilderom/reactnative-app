<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::get('/users', [ App\Http\Controllers\Api\Auth\UserController::class, 'allusers' ]);
    Route::get('/user/{id}', [ App\Http\Controllers\Api\Auth\UserController::class, 'user' ]);
    Route::get('/logout', [ App\Http\Controllers\Api\Auth\UserController::class, 'logout' ]);
});
Route::post('/register', [ App\Http\Controllers\Api\Auth\UserController::class, 'register' ]);
Route::post('/login', [ App\Http\Controllers\Api\Auth\UserController::class, 'login' ]);


Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});