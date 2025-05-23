<?php

use App\Http\Controllers\Api\AttendanceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BabController;
use App\Http\Controllers\Api\BankSoalController;
use App\Http\Controllers\Api\ClassesController;
use App\Http\Controllers\Api\JenjangKelasController;
use App\Http\Controllers\Api\MateriController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\PelajaranController;
use App\Http\Controllers\Api\PengajarController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\UserController;


// 🔐 AUTH ROUTES

Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);


// 🔒 ROUTES DENGAN LOGIN

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/update', [UserController::class, 'update']);
    Route::get('{user_id}/classes/{classes_id}', [ClassesController::class, 'show']);

    // 📘 JENJANG KELAS (untuk semua user)
    
    Route::get('/jenjang-kelas', [JenjangKelasController::class, 'index']);
    Route::get('/jenjang-kelas/{jenjang_kelas_id}/classes', [ClassesController::class, 'byJenjang']);

    // Pelajaran
    Route::get('/classes/{classId}/pelajaran', [PelajaranController::class, 'index']);
    Route::get('/pelajaran/{id}', [PelajaranController::class, 'show']);

    //Bab
    Route::get('/pelajaran/{pelajaranId}/bab', [BabController::class, 'index']); 
    Route::get('/bab/{id}', [BabController::class, 'show']); // detail bab

    // Materi
    Route::get('/bab/{babId}/materi', [MateriController::class, 'index']);
    Route::get('/materi/{id}', [MateriController::class, 'show']);     
    Route::get('/materi/{id}/download', [MateriController::class, 'downloadFile']); 
    // 🎓 SISWA ONLY
    
    Route::middleware('role:siswa')->prefix('siswa')->group(function () {
        Route::post('/jenjang-kelas/pilih', [JenjangKelasController::class, 'pilih']);
        Route::get('{user_id}/classes', [ClassesController::class, 'getAccessibleClasses']);
        // Route::get('{user_id}/classes/{classes_id}', [ClassesController::class, 'show']);
        Route::post('/payment', [PaymentController::class, 'store']);
        Route::get('/payment/siswa/{user_id}', [PaymentController::class, 'indexByUser']);
        Route::get('/schedules/student', [ScheduleController::class, 'schedulesForAuthenticatedStudent']);
    
        // 📝 ABSENSI SISWA (absensi pribadi)
        Route::post('/absensi', [AttendanceController::class, 'storeByStudent']);
        Route::get('/absensi', [AttendanceController::class, 'myAttendances']);
    });

    
    // 🔹 SISWA & PENGAJAR

    Route::middleware('role:siswa,pengajar')->group(function () {
        Route::get('/schedules/my', [ScheduleController::class, 'schedulesForAuthenticatedUser']);

        
    });

    // 🧑‍🏫 PENGAJAR ONLY

    Route::middleware(['auth:sanctum', 'role:pengajar'])->prefix('pengajar')->group(function () {
        Route::get('/jenjang-dan-kelas', [PengajarController::class, 'getJenjangDanKelas']);
        Route::get('/schedules', [PengajarController::class, 'getSchedules']);
    });

    
    // 🧑‍💼 ADMIN ONLY
    
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

        // Tambah route untuk tambah akun pengajar
        Route::post('/users/pengajar', [UserController::class, 'storePengajar']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        //pelajaran
        Route::post('/classes/{classId}/pelajaran', [PelajaranController::class, 'store']);
        Route::put('/pelajaran/{id}', [PelajaranController::class, 'update']);
        Route::delete('/pelajaran/{id}', [PelajaranController::class, 'destroy']);
        //bab
        Route::post('/pelajaran/{pelajaranId}/bab', [BabController::class, 'store']);
        Route::put('/bab/{id}', [BabController::class, 'update']); 
        Route::delete('/bab/{id}', [BabController::class, 'destroy']); 
        //materi
        Route::post('/bab/{babId}/materi', [MateriController::class, 'store']);                     
        Route::put('/materi/{id}', [MateriController::class, 'update']);            
        Route::delete('/materi/{id}', [MateriController::class, 'destroy']);   
        
        });

    
    // 🧑‍🏫 ADMIN & PENGAJAR
    
    Route::middleware('role:admin,pengajar')->prefix('manajemen')->group(function () {
        // 🔹 CRUD Kelas
        Route::post('/classes', [ClassesController::class, 'store']);
        Route::put('/classes/{id}', [ClassesController::class, 'update']);
        Route::delete('/classes/{id}', [ClassesController::class, 'destroy']);

        // 🔹 CRUD Bank Soal
        Route::post('/bank-soal', [BankSoalController::class, 'store']);
        Route::put('/bank-soal/{id}', [BankSoalController::class, 'update']);
        Route::delete('/bank-soal/{id}', [BankSoalController::class, 'destroy']);
        
        // CRUD Attendance (admin & pengajar)
        Route::get('/attendances/class/{classId}', [AttendanceController::class, 'index']);
        Route::post('/attendances', [AttendanceController::class, 'store']);
        Route::put('/attendances/{id}', [AttendanceController::class, 'update']);
        Route::delete('/attendances/{id}', [AttendanceController::class, 'destroy']);

        // CRUD ABSENSI
    });
});
