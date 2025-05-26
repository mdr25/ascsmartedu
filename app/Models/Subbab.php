<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subbab extends Model
{
    protected $table = 'subbab';

    protected $fillable = ['bab_id', 'judul_subbab', 'order'];

    public function bab()
    {
        return $this->belongsTo(Bab::class);
    }

    public function konten()
    {
        return $this->hasMany(Konten::class);
    }
}
