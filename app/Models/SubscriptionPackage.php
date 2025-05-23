<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionPackage extends Model
{
    protected $table = 'subscription_packages';
    protected $fillable = ['name', 'price', 'duration'];
    public $timestamps = false;

    public function users()
    {
        return $this->hasMany(User::class, 'subscription_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'subscription_id');
    }
}
