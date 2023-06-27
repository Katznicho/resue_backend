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
    protected $fillable = ['name', 'email', 'password', 'phone_number', 'address', 'role_id', 'title', 'user_image','otp_send_time', 'otp'];


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

    public function userType()
    {
        return $this->belongsTo(UserType::class);
    }


    public function routeNotificationForMail(Notification $notification): array|string
    {
        // Return email address only...
        return $this->email;

        // Return email address and name...
        return [$this->email => $this->name];
    }

    //a user has many orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    //a user has many products
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    //a user has many reviews
    public function reviews()
    {
        return $this->hasMany(LikeAndComment::class);
    }

    //a user many payments
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }


}
