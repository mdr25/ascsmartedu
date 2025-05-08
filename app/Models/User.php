<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'users';
    protected $fillable = ['name', 'email', 'password', 'phone_number', 'gender', 'address', 'roles_id'];
    protected $hidden = ['password'];
    public $timestamps = false;

    public function role()
    {
        return $this->belongsTo(Role::class, 'roles_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'users_id');
    }
}
