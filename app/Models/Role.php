<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika berbeda dengan plural dari model
    protected $table = 'roles';

    // Tentukan field yang dapat diisi
    protected $fillable = ['name_role'];


    public function users()
{
    return $this->hasMany(User::class, 'id_role');
}
}
