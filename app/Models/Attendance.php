<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'date',
        'status',
        'classes_id',
    ];

    public function classModel()
    {
        return $this->belongsTo(Classes::class, 'classes_id');
    }
}
