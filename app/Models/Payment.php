<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'total_amount',
        'payment_date',
        'payment_method',
        'payment_proof',
        'status',
        'users_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'classes_has_payments', 'payments_id', 'classes_id')
                    ->withPivot('payments_users_id');
    }
}
