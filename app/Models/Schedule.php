<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ClassModel;

class Schedule extends Model
{
    protected $table = 'schedules';
    protected $fillable = ['date_sched', 'course_name', 'start_time', 'end_time', 'classes_id'];
    public $timestamps = false;

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'classes_id');
    }
}
