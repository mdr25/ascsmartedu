<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classes extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'class_name',
        'total_student',
        'jenjang_kelas_id',
        'pengajar_id',
    ];

    public function jenjangKelas()
    {
        return $this->belongsTo(JenjangKelas::class, 'jenjang_kelas_id');
    }

    public function pelajaran()
    {
        return $this->hasMany(Pelajaran::class, 'classes_id');
    }
    
    public function pengajar()
    {
        return $this->belongsTo(User::class, 'pengajar_id');
    }


    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'classes_id');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class, 'classes_id');
    }

    public function bankSoal()
    {
        return $this->hasMany(BankSoal::class, 'classes_id');
    }

    public function payments()
    {
        return $this->belongsToMany(Payment::class, 'classes_has_payments', 'classes_id', 'payments_id')
                    ->withPivot('payments_users_id');
    }

}
