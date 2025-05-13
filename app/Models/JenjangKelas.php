<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JenjangKelas extends Model
{
    use HasFactory;

    protected $table = 'jenjang_kelas';

    protected $fillable = [
        'nama_jenjang',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'jenjang_kelas_id');
    }
    
    public function classes()
    {
        return $this->hasMany(Classes::class, 'jenjang_kelas_id');
    }
}
