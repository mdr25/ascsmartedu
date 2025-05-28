<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    protected $table = 'classes';
    protected $fillable = [
        'class_name',
        'description',
        'price',
        'total_student',
        'jenjang_kelas_id',
        'teacher_id'
    ];

    // Relasi ke jenjang kelas
    public function jenjangKelas()
    {
        return $this->belongsTo(JenjangKelas::class, 'jenjang_kelas_id');
    }

    // Relasi ke mapel
    public function mapel()
    {
        return $this->hasMany(Mapel::class, 'classes_id');
    }

    // Relasi ke siswa yang sudah beli kelas ini
    public function students()
    {
        return $this->belongsToMany(User::class, 'class_user', 'class_id', 'user_id');
    }

    // Relasi ke pengajar utama
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    // Relasi ke banyak pengajar (jika pakai pivot class_teacher)
    public function teachers()
    {
        return $this->belongsToMany(User::class, 'class_teacher', 'class_id', 'teacher_id');
    }
}
