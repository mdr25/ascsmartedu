<?php

use App\Http\Controllers\Admin\ClassController as AdminClassController;
use App\Http\Controllers\Admin\JenjangController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Siswa\{
    DashboardController,
    ProfileController,
    ClassController,
    AttendanceController,
    PaymentController,
    ContentController
};

Route::middleware(['auth:sanctum', 'role:siswa'])->prefix('student')->group(function () {
    // Dashboard & Profil
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('profile', [ProfileController::class, 'show']);
    Route::put('profile', [ProfileController::class, 'update']);

    // Pembayaran kelas
    Route::post('payments', [PaymentController::class, 'create']);
    Route::get('payments', [PaymentController::class, 'history']);
    Route::get('my-classes', [PaymentController::class, 'myClasses']);

    Route::get('jenjang', [JenjangController::class, 'index']);
    Route::get('jenjang/{jenjangId}/classes', [AdminClassController::class, 'getByJenjang']);
    // Kelas yang sudah dibeli
    Route::get('classes', [ClassController::class, 'index']);
    Route::get('classes/{classId}/schedule', [ClassController::class, 'schedule']);
    //melihat semua kelas
    Route::get('/all-classes', [ClassController::class, 'allClasses']);

    // Struktur materi (akses setelah beli kelas)
    Route::get('classes/{id}', [ClassController::class, 'show']);
    Route::get('classes/{classId}/mapel', [ClassController::class, 'listMapel']);
    Route::get('mapel/{mapelId}/bab', [ClassController::class, 'listBab']);
    Route::get('bab/{babId}/subbab', [ClassController::class, 'listSubbab']);
    Route::get('subbab/{subbabId}/konten', [ClassController::class, 'listKonten']);
    Route::get('bab/{babId}/konten', [ClassController::class, 'listKontenByBab']);

    // Konten (akses setelah beli kelas)
    Route::get('contents', [ContentController::class, 'index']);
    Route::get('contents/{id}', [ContentController::class, 'show']);

    // Absensi
    Route::get('attendance', [AttendanceController::class, 'index']);
    Route::put('attendance/{classId}/{attendanceId}', [AttendanceController::class, 'update']);
    Route::get('classes/{classId}/attendance/history', [AttendanceController::class, 'history']);
});
