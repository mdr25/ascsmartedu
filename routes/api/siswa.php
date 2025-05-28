<?php

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

    // Kelas yang sudah dibeli
    Route::get('classes', [ClassController::class, 'index']);
    Route::get('classes/{classId}/schedule', [ClassController::class, 'schedule']);

    // Struktur materi (akses setelah beli kelas)
    Route::get('classes/{classId}/mapel', [ClassController::class, 'listMapel']);
    Route::get('mapel/{mapelId}/bab', [ClassController::class, 'listBab']);
    Route::get('bab/{babId}/subbab', [ClassController::class, 'listSubbab']);
    Route::get('subbab/{subbabId}/konten', [ClassController::class, 'listKonten']);
    Route::get('bab/{babId}/konten', [ClassController::class, 'listKontenByBab']);

    // Konten (akses setelah beli kelas)
    Route::get('contents', [ContentController::class, 'index']);
    Route::get('contents/{id}', [ContentController::class, 'show']);

    // Absensi
    Route::get('classes/{classId}/attendance', [AttendanceController::class, 'index']);
    Route::put('classes/{classId}/attendance/{attendanceId}', [AttendanceController::class, 'update']);
    Route::get('classes/{classId}/attendance/history', [AttendanceController::class, 'history']);
});
