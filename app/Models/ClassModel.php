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
}
