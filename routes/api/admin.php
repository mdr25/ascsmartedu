<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
    DashboardController,
    UserController,
    PaymentController,
    TeacherController,
    JenjangController,
    ClassController,
    MapelController,
    BabController,
    SubbabController,
    ContentController,
    ContentOrderController,
    UserRoleController
};

Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index']);

    // User & Role Management
    Route::apiResource('users', UserController::class)->except('show');
    Route::get('roles', [UserRoleController::class, 'allRoles']);

    // Jenjang & Kelas
    Route::apiResource('jenjang', JenjangController::class);
    Route::apiResource('classes', ClassController::class);

    // Pengajar
    Route::get('teachers', [TeacherController::class, 'index']);
    Route::post('classes/{classId}/assign-teacher', [ClassController::class, 'assignTeacher']);
    Route::delete('/classes/{id}/removeTeacher', [ClassController::class, 'removeTeacher']);
    Route::post('classes/{classId}/add-assistant-teacher', [ClassController::class, 'addAssistantTeacher']);
    Route::delete('classes/{classId}/remove-assistant-teacher/{teacherId}', [ClassController::class, 'removeAssistantTeacher']);
    Route::delete('/classes/{classId}/students/{studentId}', [ClassController::class, 'removeStudent']);

    // Materi
    Route::apiResource('mapel', MapelController::class);
    Route::apiResource('bab', BabController::class);
    Route::apiResource('subbab', SubbabController::class);
    Route::apiResource('content', ContentController::class);

    // Order/Ubah Urutan Materi
    Route::patch('content/order/bab', [ContentOrderController::class, 'updateBabOrder']);
    Route::patch('content/order/subbab', [ContentOrderController::class, 'updateSubbabOrder']);
    Route::patch('content/order/content', [ContentOrderController::class, 'updateContentOrder']);

    // Pembayaran
    Route::get('payments', [PaymentController::class, 'index']);
    Route::get('payments/{id}', [PaymentController::class, 'show']);
    Route::patch('payments/{id}/status', [PaymentController::class, 'updateStatus']);
    Route::patch('payments/{id}/verify', [PaymentController::class, 'verify']);
});







// Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {

//     // Admin Dashboard
//     Route::get('dashboard', [DashboardController::class, 'index']);

//     // User Management
//     Route::apiResource('users', UserController::class)->except('show');
//     Route::get('user-roles', [UserRoleController::class, 'index']);
//     Route::put('user-roles/{id}', [UserRoleController::class, 'updateRole']);
//     Route::get('roles', [UserRoleController::class, 'allRoles']);

//     // Payments | List all payments, show specific payment, update status, delete payment
//     Route::get('payments', [PaymentController::class, 'index']);
//     Route::get('payments/{id}', [PaymentController::class, 'show']);
//     Route::patch('payments/{id}/status', [PaymentController::class, 'updateStatus']);
//     Route::delete('payments/{id}', [PaymentController::class, 'destroy']);

//     // Subscription Packages
//     Route::apiResource('subscription-packages', SubscriptionPackageController::class);

//     // Teachers
//     Route::get('teachers', [TeacherController::class, 'index']);

//     Route::apiResource('jenjang', JenjangController::class);
//     Route::apiResource('classes', ClassController::class);
//     Route::apiResource('mapel', MapelController::class);
//     Route::apiResource('bab', BabController::class);
//     Route::apiResource('subbab', SubbabController::class);

//     // Konten Management
//     Route::apiResource('konten', KontenController::class);
//     Route::patch('konten/order/bab', [KontenOrderController::class, 'updateBabOrder']);
//     Route::patch('konten/order/subbab', [KontenOrderController::class, 'updateSubbabOrder']);
//     Route::patch('konten/order/konten', [KontenOrderController::class, 'updateKontenOrder']);
// });
