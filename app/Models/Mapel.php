<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mapel extends Model
{
    protected $table = 'mata_pelajaran';

    protected $fillable = ['classes_id', 'nama_mapel'];

    public function classes()
    {
        return $this->belongsTo(ClassModel::class, 'classes_id');
    }

    public function bab()
    {
        return $this->hasMany(Bab::class);
    }
}
