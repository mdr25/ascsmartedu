<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    protected $table = 'classes';
    protected $fillable = ['class_name', 'total_student', 'jenjang_kelas_id'];
    public $timestamps = false;

    public function jenjangKelas()
    {
        return $this->belongsTo(JenjangKelas::class, 'jenjang_kelas_id');
    }

    public function mapel()
    {
        return $this->hasMany(Mapel::class);
    }

    public function bookmarkedBy()
    {
        return $this->belongsToMany(User::class, 'bookmarked_classes', 'class_id', 'user_id')->withTimestamps();
    }

    public function pengajar()
    {
        return $this->hasOne(User::class, 'classes_id')->whereHas('role', function ($query) {
            $query->where('name', 'Pengajar');
        });
    }
}
