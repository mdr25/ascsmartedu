<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BankSoalController;
use App\Http\Controllers\Api\ClassesController;
use App\Http\Controllers\Api\JenjangKelasController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\UserController;

// ==========================
// 🔐 AUTH ROUTES
// ==========================
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);

// ==========================
// 🔒 ROUTES DENGAN LOGIN
// ==========================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // ==========================
    // 📘 BANK SOAL (untuk semua user)
    // ==========================
    Route::get('/bank-soal/{level}', [BankSoalController::class, 'indexByLevel']);

    // ==========================
    // 📘 JENJANG KELAS (untuk semua user)
    // ==========================
    Route::get('/jenjang-kelas', [JenjangKelasController::class, 'index']);
    Route::get('/jenjang-kelas/{jenjang_kelas_id}/classes', [ClassesController::class, 'byJenjang']);

    // ==========================
    // 🎓 SISWA ONLY
    // ==========================
    Route::middleware('role:siswa')->prefix('siswa')->group(function () {
        Route::post('/jenjang-kelas/pilih', [JenjangKelasController::class, 'pilih']);
        Route::get('{user_id}/classes', [ClassesController::class, 'getAccessibleClasses']);
        Route::get('{user_id}/classes/{classes_id}', [ClassesController::class, 'show']);
        Route::post('/payment', [PaymentController::class, 'store']);
        Route::get('/payment/siswa/{user_id}', [PaymentController::class, 'indexByUser']);
        Route::get('/schedules/student', [ScheduleController::class, 'schedulesForAuthenticatedStudent']);
    });

    // ==========================
    // 🔹 SISWA & PENGAJAR 
    // ==========================
    Route::middleware('role:siswa,pengajar')->group(function () {
        Route::get('/schedules/my', [ScheduleController::class, 'schedulesForAuthenticatedUser']);
    });

    // ==========================
    // 🧑‍💼 ADMIN ONLY
    // ==========================
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/roles', [RoleController::class, 'index']);
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::get('/jenjang-kelas/{jenjang_kelas_id}/users', [JenjangKelasController::class, 'getUsersByJenjang']);
        Route::get('/payment/admin', [PaymentController::class, 'indexForAdmin']);
        Route::get('/schedules', [ScheduleController::class, 'index']);
        Route::post('/schedules', [ScheduleController::class, 'store']);
        Route::put('/schedules/{id}', [ScheduleController::class, 'update']);
        Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);
    });

    // ==========================
    // 🧑‍🏫 ADMIN & PENGAJAR
    // ==========================
    Route::middleware('role:admin,pengajar')->prefix('manajemen')->group(function () {
        // 🔹 CRUD Kelas
        Route::post('/classes', [ClassesController::class, 'store']);
        Route::put('/classes/{id}', [ClassesController::class, 'update']);
        Route::delete('/classes/{id}', [ClassesController::class, 'destroy']);

        // 🔹 CRUD Bank Soal
        Route::post('/bank-soal', [BankSoalController::class, 'store']);
        Route::put('/bank-soal/{id}', [BankSoalController::class, 'update']);
        Route::delete('/bank-soal/{id}', [BankSoalController::class, 'destroy']);
    });
});
