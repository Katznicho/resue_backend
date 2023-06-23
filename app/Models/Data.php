<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Data extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
    'title',
     'type',
    'description',
     'filename',
     'filepath',
     'duration',
     'size',
     'frame_rate',
      'encoding_format',
     'bit_rate',
     'upload_rate',
     'baby_id',
      "label"
    ];

    public function baby()
    {
        return $this->belongsTo(Baby::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
