<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BankSoalController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {
    // CRUD Users
    Route::get('/users', [AdminController::class, 'listUsers']);
    Route::post('/users', [AdminController::class, 'createUser']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);

    // CRUD Classes
    Route::get('/classes', [AdminController::class, 'listClasses']);
    Route::post('/classes', [AdminController::class, 'createClass']);
    Route::put('/classes/{id}', [AdminController::class, 'updateClass']);
    Route::delete('/classes/{id}', [AdminController::class, 'deleteClass']);

    // Manage Payments
    Route::get('/payments', [AdminController::class, 'listPayments']);
    Route::put('/payments/{id}/status', [AdminController::class, 'updatePaymentStatus']);

    // Manage Roles
    Route::get('/pengajar', [AdminController::class, 'getTeachers']);
});

Route::middleware(['auth:sanctum', 'role:Siswa'])->prefix('student')->group(function () {
    // Subscription Management
    Route::get('/subscription', [SubscriptionController::class, 'checkSubscription']);
    Route::get('/subscription/status', [SubscriptionController::class, 'subscriptionStatus']);

    // Payment Transactions
    Route::post('/payments', [PaymentController::class, 'createPayment']);
    Route::get('/payments', [PaymentController::class, 'paymentHistory']);
});

Route::middleware(['auth:sanctum', 'role:Siswa', 'hasActiveSubscription'])->prefix('student')->group(function () {
    Route::get('/classes', [ClassController::class, 'index']);
    Route::get('/classes/{classId}/schedule', [ClassController::class, 'schedule']);
    Route::get('/classes/{classId}/attendance', [ClassController::class, 'attendance']);
    Route::put('/classes/{classId}/attendance/{attendanceId}', [ClassController::class, 'updateAttendance']);
    Route::get('/classes/{id}/bank_soal', [ClassController::class, 'bankSoal']);
});

Route::middleware('auth:sanctum')->prefix('teacher')->group(function () {
    Route::get('/classes', [TeacherController::class, 'getClasses']);
    Route::get('/classes/{id}/students', [TeacherController::class, 'getStudentsInClass']);
    Route::post('/classes/{id}/attendance', [TeacherController::class, 'createAttendance']);
    Route::get('/classes/{id}/attendance', [TeacherController::class, 'getAttendancesInClass']);
    Route::put('/attendance/{id}', [TeacherController::class, 'updateAttendance']);

    Route::post('/schedules', [TeacherController::class, 'createSchedule']);

    Route::post('/bank_soal', [TeacherController::class, 'storeBankSoal']);
    Route::put('/bank_soal/{id}', [TeacherController::class, 'updateBankSoal']);
    Route::delete('/bank_soal/{id}', [TeacherController::class, 'deleteBankSoal']);
});
