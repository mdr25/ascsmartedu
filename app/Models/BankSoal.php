<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BankSoal extends Model
{
    use HasFactory;

    protected $table = 'bank_soal';

    protected $fillable = [
        'nama_materi',
        'soal',
        'materi',
        'level',
        'classes_id',
    ];

    public function classModel()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }
}
