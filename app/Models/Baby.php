<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Baby extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'dob', 'gender', 'weight', 'length', 'medical_conditions', 'user_id', 'baby_image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function data()
    {
        return $this->hasMany(Data::class);
    }
}
