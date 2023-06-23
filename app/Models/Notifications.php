<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notifications extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['type', 'user_id', 'message', 'importance_level', 'status', 'subject'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
