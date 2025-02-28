<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = ['order_id', 'product_id', 'quantity', 'price', 'product_variant_id'];

    /**
     * Relasi ke pesanan.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Relasi ke produk.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id')->withDefault();
    }
}
