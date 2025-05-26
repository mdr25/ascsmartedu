<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Konten extends Model
{
    protected $table = 'konten';

    protected $fillable = [
        'judul_konten',
        'tipe_konten',
        'konten_url',
        'durasi',
        'is_free',
        'bab_id',
        'subbab_id',
        'order'
    ];

    public function bab()
    {
        return $this->belongsTo(Bab::class);
    }

    public function subbab()
    {
        return $this->belongsTo(Subbab::class);
    }
}
