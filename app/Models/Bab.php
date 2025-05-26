<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bab extends Model
{
    protected $table = 'bab';

    protected $fillable = ['mapel_id', 'nama_bab', 'order'];

    public function mapel()
    {
        return $this->belongsTo(Mapel::class, 'mapel_id');
    }

    public function subbab()
    {
        return $this->hasMany(Subbab::class);
    }

    public function konten()
    {
        return $this->hasMany(Konten::class);
    }
}
