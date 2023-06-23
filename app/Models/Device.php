<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Device extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'user_id', 'type', 'location', 'status', 'version', 'model','device_serial_number'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //device has many sensors
    public function sensors()
    {
        return $this->hasMany(Sensor::class);
    }
}
