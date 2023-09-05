<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to -- the "web" middleware group. Make something great!
|
*/


Route::post('/api/users', [App\Http\Controllers\userController::class, "create"]);
Route::get('/api/users', [App\Http\Controllers\userController::class, "read"]);
Route::patch('/api/users', [App\Http\Controllers\userController::class, "update"]);
Route::delete('/api/users/{id}', [App\Http\Controllers\userController::class, "delete"]);

Route::view('/{any}', 'admin.layouts.app')
    ->where('any', '.*');