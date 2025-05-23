<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendances';

    protected $fillable = [
    'user_id', 'date', 'status', 'classes_id'
];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function classModel()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }

    public function attendanceForm()
    {
        return $this->belongsTo(AttendanceForm::class);
    }
    // AttendanceForm.php
    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }

}
