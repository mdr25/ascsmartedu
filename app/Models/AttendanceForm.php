<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceForm extends Model
{
    use HasFactory;

    protected $fillable = ['classes_id', 'date'];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function classModel()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }
}
