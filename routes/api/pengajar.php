<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Pengajar\ClassController;
use App\Http\Controllers\Pengajar\AttendanceController;
use App\Http\Controllers\Pengajar\ScheduleController;
use App\Http\Controllers\Pengajar\BankSoalController;

Route::middleware(['auth:sanctum', 'role:Pengajar'])->prefix('teacher')->group(function () {
    // Classes
    Route::get('/classes', [ClassController::class, 'index']);
    Route::get('/classes/{id}/students', [ClassController::class, 'students']);

    // Attendance
    Route::post('/classes/{id}/attendance', [AttendanceController::class, 'store']);
    Route::get('/classes/{id}/attendance', [AttendanceController::class, 'index']);
    Route::put('/attendance/{id}', [AttendanceController::class, 'update']);

    // Schedules
    Route::post('/schedules', [ScheduleController::class, 'store']);

    // Bank Soal
    Route::post('/bank_soal', [BankSoalController::class, 'store']);
    Route::put('/bank_soal/{id}', [BankSoalController::class, 'update']);
    Route::delete('/bank_soal/{id}', [BankSoalController::class, 'destroy']);
});
