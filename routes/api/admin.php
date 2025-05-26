<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\Admin\JenjangController;
use App\Http\Controllers\Admin\ClassController;
use App\Http\Controllers\Admin\MapelController;
use App\Http\Controllers\Admin\BabController;
use App\Http\Controllers\Admin\SubbabController;
use App\Http\Controllers\Admin\KontenController;
use App\Http\Controllers\Admin\KontenOrderController;
use App\Http\Controllers\Admin\SubscriptionPackageController;

Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {

    // Admin Dashboard
    Route::get('dashboard', [DashboardController::class, 'index']);

    // User Management
    Route::apiResource('users', UserController::class)->except('show');
    Route::get('user-roles', [UserRoleController::class, 'index']);
    Route::put('user-roles/{id}', [UserRoleController::class, 'updateRole']);
    Route::get('roles', [UserRoleController::class, 'allRoles']);

    // Payments | List all payments, show specific payment, update status, delete payment
    Route::get('payments', [PaymentController::class, 'index']);
    Route::get('payments/{id}', [PaymentController::class, 'show']);
    Route::patch('payments/{id}/status', [PaymentController::class, 'updateStatus']);
    Route::delete('payments/{id}', [PaymentController::class, 'destroy']);

    // Subscription Packages
    Route::apiResource('subscription-packages', SubscriptionPackageController::class);

    // Teachers
    Route::get('teachers', [TeacherController::class, 'index']);

    Route::apiResource('jenjang', JenjangController::class);
    Route::apiResource('classes', ClassController::class);
    Route::apiResource('mapel', MapelController::class);
    Route::apiResource('bab', BabController::class);
    Route::apiResource('subbab', SubbabController::class);

    // Konten Management
    Route::apiResource('konten', KontenController::class);
    Route::patch('konten/order/bab', [KontenOrderController::class, 'updateBabOrder']);
    Route::patch('konten/order/subbab', [KontenOrderController::class, 'updateSubbabOrder']);
    Route::patch('konten/order/konten', [KontenOrderController::class, 'updateKontenOrder']);
});
