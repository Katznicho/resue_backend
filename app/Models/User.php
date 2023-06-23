<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\HasPushSubscriptions;


/**
 * @method static create(array $array)
 * @method static find($id)
 * @property string id
 */
class User extends Authenticatable
{
    use HasPushSubscriptions, HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password', 'phone_number', 'address', 'role_id', 'baby_id', 'title', 'user_image','otp_send_time', 'otp'];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that have default values
     *
     * @var array
     */


    protected $attributes = [];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function baby(): HasOne
    {
        return $this->hasOne(Baby::class);
    }

    // public function notifications()
    // {
    //     return $this->hasMany(Notification::class);
    // }
    public function routeNotificationForMail(Notification $notification): array|string
    {
        // Return email address only...
        return $this->email;

        // Return email address and name...
        return [$this->email => $this->name];
    }


}
