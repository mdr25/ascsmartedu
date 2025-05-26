<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Siswa\DashboardController;
use App\Http\Controllers\Siswa\ProfileController;
use App\Http\Controllers\Siswa\ClassController;
use App\Http\Controllers\Siswa\AttendanceController;
use App\Http\Controllers\Siswa\PaymentController;
use App\Http\Controllers\Siswa\SubscriptionController;
use App\Http\Controllers\Siswa\ContentController;
use App\Http\Controllers\Siswa\BabController;

Route::middleware(['auth:sanctum', 'role:Siswa'])->prefix('student')->group(function () {
    // Dashboard & Profil
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('profile', [ProfileController::class, 'show']);
    Route::put('profile', [ProfileController::class, 'update']);
    Route::patch('profile', [ProfileController::class, 'update']);

    // Pembayaran & Langganan
    Route::post('payments', [PaymentController::class, 'create']);
    Route::get('payments', [PaymentController::class, 'history']);
    Route::get('subscription/check', [SubscriptionController::class, 'check']);
    Route::get('subscription/status', [SubscriptionController::class, 'status']);

    // Mapel, Bab, Subbab, dan Konten
    Route::get('classes/{classId}/mapel', [ClassController::class, 'listMapel']);
    Route::get('mapel/{mapelId}/bab', [ClassController::class, 'listBab']);
    Route::get('bab/{babId}/subbab', [ClassController::class, 'listSubbab']);
    Route::get('subbab/{subbabId}/konten', [ClassController::class, 'listKonten']);

    // Konten gratis (atau preview)
    Route::get('contents', [ContentController::class, 'index']);
    Route::get('contents/{id}', [ContentController::class, 'show']);
});

Route::middleware(['auth:sanctum', 'role:Siswa', 'hasActiveSubscription'])->prefix('student')->group(function () {
    // Kelas & Jadwal
    Route::get('classes', [ClassController::class, 'index']);
    Route::get('classes/{classId}/schedule', [ClassController::class, 'schedule']);

    // Bookmark kelas
    Route::get('bookmarks', [ClassController::class, 'listBookmarkedClasses']);
    Route::post('bookmarks/{classId}', [ClassController::class, 'bookmark']);
    Route::delete('bookmarks/{classId}', [ClassController::class, 'unbookmark']);

    // Absensi
    Route::get('classes/{classId}/attendance', [AttendanceController::class, 'index']);
    Route::put('classes/{classId}/attendance/{attendanceId}', [AttendanceController::class, 'update']);
    Route::get('classes/{classId}/attendance/history', [AttendanceController::class, 'history']);
});
