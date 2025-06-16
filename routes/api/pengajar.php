<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pengajar\{
    DashboardController,
    ProfileController,
    ClassController,
    AttendanceController,
    ScheduleController,
    BankSoalController
};

Route::middleware(['auth:sanctum', 'role:pengajar'])->prefix('teacher')->group(function () {
    // Dashboard & Profil
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('profile', [ProfileController::class, 'show']);
    Route::put('profile', [ProfileController::class, 'update']);

    // Kelas & Siswa
    Route::get('classes', [ClassController::class, 'index']);
    Route::get('classes/{id}', [ClassController::class, 'show']); // opsional
    Route::get('classes/{id}/students', [ClassController::class, 'students']);

    // Jadwal & Absensi
    Route::get('classes/{id}/schedules', [ScheduleController::class, 'index']);
    Route::post('schedules', [ScheduleController::class, 'store']);
    Route::get('classes/{id}/attendance', [AttendanceController::class, 'index']);
    Route::post('classes/{id}/attendance', [AttendanceController::class, 'store']);
    Route::put('attendance/{id}', [AttendanceController::class, 'update']);

    // Bank Soal
    Route::get('bank_soal', [BankSoalController::class, 'index']);
    Route::post('bank_soal', [BankSoalController::class, 'store']);
    Route::put('bank_soal/{id}', [BankSoalController::class, 'update']);
    Route::delete('bank_soal/{id}', [BankSoalController::class, 'destroy']);
});











// use Illuminate\Support\Facades\Route;

// use App\Http\Controllers\Pengajar\ClassController;
// use App\Http\Controllers\Pengajar\AttendanceController;
// use App\Http\Controllers\Pengajar\ScheduleController;
// use App\Http\Controllers\Pengajar\BankSoalController;

// Route::middleware(['auth:sanctum', 'role:Pengajar'])->prefix('teacher')->group(function () {
//     // Classes
//     Route::get('/classes', [ClassController::class, 'index']);
//     Route::get('/classes/{id}/students', [ClassController::class, 'students']);

//     // Attendance
//     Route::post('/classes/{id}/attendance', [AttendanceController::class, 'store']);
//     Route::get('/classes/{id}/attendance', [AttendanceController::class, 'index']);
//     Route::put('/attendance/{id}', [AttendanceController::class, 'update']);

//     // Schedules
//     Route::post('/schedules', [ScheduleController::class, 'store']);

//     // Bank Soal
//     Route::post('/bank_soal', [BankSoalController::class, 'store']);
//     Route::put('/bank_soal/{id}', [BankSoalController::class, 'update']);
//     Route::delete('/bank_soal/{id}', [BankSoalController::class, 'destroy']);
// });
