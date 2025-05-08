<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenjangKelas extends Model
{
    protected $table = 'jenjang_kelas';
    protected $fillable = ['nama_jenjang'];
    public $timestamps = false;

    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'jenjang_kelas_id');
    }
}
