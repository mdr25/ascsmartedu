<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bab extends Model
{
    use HasFactory;
    protected $table = 'bab';

    protected $fillable = ['nama_bab', 'pelajaran_id'];

    public function pelajaran()
    {
        return $this->belongsTo(Pelajaran::class);
    }

    public function materi()
    {
        return $this->hasMany(Materi::class);
    }
}

