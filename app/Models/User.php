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

    // Relasi ke kelas yang dibeli siswa
    public function classes()
    {
        return $this->belongsToMany(ClassModel::class, 'class_user', 'user_id', 'class_id')->withTimestamps();
    }

    // Relasi ke kelas yang diampu pengajar (jika pakai class_teacher)
    public function teachingClasses()
    {
        // Jika pakai pivot class_teacher
        return $this->belongsToMany(
            ClassModel::class,
            'class_teacher',
            'teacher_id',
            'class_id'
        );
    }

    // Relasi ke pembayaran
    public function payments()
    {
        return $this->hasMany(Payment::class, 'user_id');
    }
}
