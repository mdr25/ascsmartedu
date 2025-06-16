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

    public function jenjangKelas()
    {
        return $this->belongsTo(JenjangKelas::class, 'jenjang_kelas_id');
    }

    public function mapel()
    {
        return $this->hasMany(Mapel::class, 'classes_id');
    }


    public function students()
    {
        return $this->hasMany(Payment::class, 'class_id')->with('user');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function teachers()
    {
        return $this->belongsToMany(User::class, 'class_teacher', 'class_id', 'teacher_id');
    }

    public function getStudentCountAttribute()
{
    return $this->students()->count(); 
}

}
