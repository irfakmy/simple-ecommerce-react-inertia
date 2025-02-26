<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'transaction_id', 'payment_method', 'payment_type',
        'payment_status', 'transaction_status', 'fraud_status', 'payment_token',
        'snap_token', 'gross_amount'
    ];

    /**
     * Relasi ke pesanan.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
