<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookmarkedClass extends Model
{
    protected $table = 'bookmarked_classes';

    protected $fillable = ['user_id', 'class_id'];
}
