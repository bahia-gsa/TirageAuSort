<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\apiController;

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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::post('/game', [apiController::class, 'storeGame']);
Route::get('/games/{id}', [apiController::class, 'getAllGames']);
Route::delete('/game/{id}', [apiController::class, 'deleteGame']);

Route::post('/participant', [apiController::class, 'storeParticipant']);
Route::get('/participants/{id}/{game_id}', [apiController::class, 'getAllParticipants']);
Route::delete('/participants/{id}/{game_id}', [apiController::class, 'deleteParticipant']);

Route::get('/draw/{id}/{game_id}', [apiController::class, 'draw']);
Route::get('/draws/{id}/{game_id}', [apiController::class, 'getDraws']);

*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/game', [ApiController::class, 'storeGame']);
    Route::get('/games/{id}', [ApiController::class, 'getAllGames']);
    Route::delete('/game/{id}', [ApiController::class, 'deleteGame']);

    Route::post('/participant', [ApiController::class, 'storeParticipant']);
    Route::get('/participants/{id}/{game_id}', [ApiController::class, 'getAllParticipants']);
    Route::delete('/participants/{id}/{game_id}', [ApiController::class, 'deleteParticipant']);

    Route::get('/draw/{id}/{game_id}', [ApiController::class, 'draw']);
    Route::get('/draws/{id}/{game_id}', [ApiController::class, 'getDraws']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);




