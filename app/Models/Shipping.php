<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'shiping_method', 'shiping_status', 'shiping_cost',
        'recipient_name', 'address', 'city', 'province', 'zip_code', 'country', 'tracking_number'
    ];

    /**
     * Relasi ke pesanan.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
