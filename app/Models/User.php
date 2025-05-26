<?php

/**
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ClassModel[] $bookmarkedClasses
 * @method static \Illuminate\Database\Eloquent\Relations\BelongsToMany bookmarkedClasses()
 */

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['name', 'email', 'password', 'phone_number', 'gender', 'address', 'roles_id', 'subscription_id'];
    protected $hidden = ['password'];
    public $timestamps = false;

    public function role()
    {
        return $this->belongsTo(Role::class, 'roles_id');
    }

    public function kelas()
    {
        return $this->belongsTo(ClassModel::class, 'classes_id');
    }

    public function bookmarkedClasses()
    {
        return $this->belongsToMany(ClassModel::class, 'bookmarked_classes', 'user_id', 'class_id')->withTimestamps();
    }

    public function subscription()
    {
        return $this->belongsTo(SubscriptionPackage::class, 'subscription_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'users_id');
    }

    public function hasSubscription()
    {
        return $this->subscription_id !== null;
    }

    public function hasActiveSubscription()
    {
        return $this->payments()
            ->where('status', 'paid')
            ->exists();
    }
}
