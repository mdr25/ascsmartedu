<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelajaran extends Model
{
    use HasFactory;
    protected $table = 'pelajaran';
    protected $fillable = ['nama_pelajaran', 'classes_id'];

    public function classModel()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }

    public function bab()
    {
        return $this->hasMany(Bab::class);
    }
}

