<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BankSoalController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::apiResource('roles', RoleController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('payments', PaymentController::class);
    Route::apiResource('classes', ClassController::class);
    Route::apiResource('schedules', ScheduleController::class);
    Route::apiResource('attendance', AttendanceController::class);
    Route::apiResource('bank-soal', BankSoalController::class);
});


// Route::get('/roles', [RoleController::class, 'index']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/payments', [PaymentController::class, 'index']);
//     Route::post('/payments', [PaymentController::class, 'store']);
//     Route::put('/payments/{id}', [PaymentController::class, 'update']);

//     Route::get('/classes', [ClassController::class, 'index']);
//     Route::post('/classes', [ClassController::class, 'store']);
//     Route::put('/classes/{id}', [ClassController::class, 'update']);
//     Route::delete('/classes/{id}', [ClassController::class, 'destroy']);

//     Route::get('/schedules', [ScheduleController::class, 'index']);
//     Route::post('/schedules', [ScheduleController::class, 'store']);
//     Route::put('/schedules/{id}', [ScheduleController::class, 'update']);
//     Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);

//     Route::get('/attendance', [AttendanceController::class, 'index']);
//     Route::post('/attendance', [AttendanceController::class, 'store']);
//     Route::put('/attendance/{id}', [AttendanceController::class, 'update']);
//     Route::delete('/attendance/{id}', [AttendanceController::class, 'destroy']);

//     Route::get('/bank-soal', [BankSoalController::class, 'index']);
//     Route::post('/bank-soal', [BankSoalController::class, 'store']);
//     Route::put('/bank-soal/{id}', [BankSoalController::class, 'update']);
//     Route::delete('/bank-soal/{id}', [BankSoalController::class, 'destroy']);
// });
