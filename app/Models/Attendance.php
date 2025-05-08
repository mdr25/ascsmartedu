<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ClassModel;

class Attendance extends Model
{
    protected $table = 'attendance';
    protected $fillable = ['date', 'status', 'classes_id'];
    public $timestamps = false;

    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'classes_id');
    }
}
