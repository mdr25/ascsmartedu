<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';
    protected $fillable = ['total_amount', 'payment_date', 'payment_method', 'payment_proof', 'status', 'users_id'];
    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}
