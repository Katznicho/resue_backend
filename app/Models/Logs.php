<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Logs extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'user_id',
        'ip_address',
        'severity',
        'message',
        'error_code',
        'platform',
        'action',
        'method',
        'path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
