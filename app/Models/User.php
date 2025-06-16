<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'gender',
        'address',
        'roles_id'
    ];

    protected $hidden = ['password'];

    // Relasi ke role
    public function role()
    {
        return $this->belongsTo(Role::class, 'roles_id');
    }

    // Kelas yang dibeli siswa
    public function classes()
    {
        return $this->belongsToMany(ClassModel::class, 'class_user', 'user_id', 'class_id')->withTimestamps();
    }

    // Kelas sebagai pengajar pendamping
    public function teachingClasses()
    {
        return $this->belongsToMany(ClassModel::class, 'class_teacher', 'user_id', 'class_id');
    }

    // Kelas sebagai pengajar utama
    public function mainTeachingClasses()
    {
        return $this->hasMany(ClassModel::class, 'teacher_id');
    }

    // Riwayat pembayaran
    public function payments()
    {
        return $this->hasMany(Payment::class, 'user_id');
    }
}
