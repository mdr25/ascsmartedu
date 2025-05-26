<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/admin.php';
require __DIR__ . '/api/siswa.php';
require __DIR__ . '/api/pengajar.php';

use App\Http\Controllers\UserController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\ContentController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::prefix('public')->group(function () {
    Route::get('jenjang', [ClassController::class, 'listJenjang']);
    Route::get('classes', [ClassController::class, 'index']);
    Route::get('classes/{classId}/mapel', [ClassController::class, 'listMapel']);
    Route::get('mapel/{mapelId}/bab', [ClassController::class, 'listBab']);
    Route::get('bab/{babId}/subbab', [ClassController::class, 'listSubbab']);
    Route::get('subbab/{subbabId}/konten', [ClassController::class, 'listKonten']);
    Route::get('konten/{id}', [ContentController::class, 'show']);
});





















// use App\Http\Controllers\AdminController;
// use App\Http\Controllers\TeacherController;
// use App\Http\Controllers\PaymentController;
// use App\Http\Controllers\SubscriptionController;
// use App\Http\Controllers\ClassController;

// use App\Http\Controllers\RoleController;
// use App\Http\Controllers\ScheduleController;
// use App\Http\Controllers\AttendanceController;
// use App\Http\Controllers\BankSoalController;

// Route::middleware(['auth:sanctum', 'role:Pengajar'])->prefix('teacher')->group(function () {
//     Route::get('/classes', [TeacherController::class, 'getClasses']);
//     Route::get('/classes/{id}/students', [TeacherController::class, 'getStudentsInClass']);
//     Route::post('/classes/{id}/attendance', [TeacherController::class, 'createAttendance']);
//     Route::get('/classes/{id}/attendance', [TeacherController::class, 'getAttendancesInClass']);
//     Route::put('/attendance/{id}', [TeacherController::class, 'updateAttendance']);

//     Route::post('/schedules', [TeacherController::class, 'createSchedule']);

//     Route::post('/bank_soal', [TeacherController::class, 'storeBankSoal']);
//     Route::put('/bank_soal/{id}', [TeacherController::class, 'updateBankSoal']);
//     Route::delete('/bank_soal/{id}', [TeacherController::class, 'deleteBankSoal']);
// });
