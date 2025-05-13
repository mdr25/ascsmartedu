<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    protected $fillable = [
        'date_sched',
        'course_name',
        'start_time',
        'end_time',
        'classes_id',
    ];

    // Relasi: Schedule milik sebuah Class
    public function classModel()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }
}
