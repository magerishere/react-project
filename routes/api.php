<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('/post',PostController::class);
Route::resource('/category',CategoryController::class);
Route::post('/post/update/{id}',[PostController::class,'postUpdate']);
Route::post('/post/multidelete',[PostController::class,'multiDeletePosts']);
Route::post('/post/multiEdit',[PostController::class,'multiEditPosts']);