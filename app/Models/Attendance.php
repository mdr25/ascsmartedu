<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ClassModel;

class Attendance extends Model
{
    protected $table = 'attendance';
    protected $fillable = ['users_id', 'classes_id', 'schedule_id', 'date', 'status'];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'classes_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }
}
