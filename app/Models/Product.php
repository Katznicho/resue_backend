<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'cover_image', 'additional_images', 'description', 'user_id', 'product_category_id', 'price', 'discount', 'discount_type', 'quantity', 'longitute', 'latitude', 'address', 'is_verified', 'product_type_id'];

    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', '%' . $search . '%')
            ->orWhere('description', 'like', '%' . $search . '%');
    }

    public function scopeCategory($query, $category)
    {
        return $query->where('category_id', $category);
    }

    


}


