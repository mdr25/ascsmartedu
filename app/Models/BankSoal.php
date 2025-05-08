<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ClassModel;

class BankSoal extends Model
{
    protected $table = 'bank_soal';
    protected $fillable = ['nama_materi', 'soal', 'materi', 'level', 'classes_id'];
    public $timestamps = false;

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'classes_id');
    }
}
