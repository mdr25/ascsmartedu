<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Materi extends Model
{
    use HasFactory;
    protected $table = 'materi';
    protected $fillable = ['nama_materi', 'desc_materi', 'file_path', 'bab_id'];

    public function bab()
    {
        return $this->belongsTo(Bab::class);
    }
}
