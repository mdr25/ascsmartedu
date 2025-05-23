<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
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

    protected static function booted()
{
    // Contoh global scope yang membatasi query
    static::addGlobalScope('active', function (Builder $builder) {
        $builder->where('is_active', 1);
    });
}
    // Relasi ke Role
    public function role()
    {
        return $this->belongsTo(Role::class, 'id_role');
    }

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'class_user', 'user_id', 'class_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

     public function taughtClasses()
    {
        return $this->hasMany(Classes::class, 'pengajar_id');
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
