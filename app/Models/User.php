<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relasi ke Role
    public function role()
    {
        return $this->belongsTo(Role::class, 'id_role');
    }

    // File: app/Models/User.php

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'class_user', 'user_id', 'class_id');
    }

    // Fungsi untuk mengecek role
    public function hasRole($roleName)
    {
        return $this->role && $this->role->name_role === $roleName;
    }

    public function hasAnyRole(array $roles)
    {
        return $this->role && in_array($this->role->name_role, $roles);
    }

    public function jenjangKelas()
    {
        return $this->belongsTo(JenjangKelas::class, 'jenjang_kelas_id');
    }
}
