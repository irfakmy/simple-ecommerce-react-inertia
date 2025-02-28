<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'customer_name', 'customer_email', 'customer_phone','snap_token',
        'subtotal', 'total_amount', 'payment_status', 'shipment_status'
    ];
    protected $attributes = [
        'payment_status' => 'pending',
    ];

    /**
     * Relasi ke pengguna.
     */
    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getPaymentStatusLabelAttribute()
    {
        return match ($this->payment_status) {
            'pending'   => 'Menunggu Pembayaran',
            'paid'      => 'Sudah Dibayar',
            'failed'    => 'Pembayaran Gagal',
            'expired'   => 'Pembayaran Kadaluarsa',
            default     => 'Status Tidak Diketahui',
        };
    }

    public function getShipmentStatusLabelAttribute()
    {
        return match ($this->shipment_status) {
            'pending'   => 'Menunggu Pengiriman',
            'shipped'   => 'Sedang Dikirim',
            'delivered' => 'Sudah Diterima',
            'canceled'  => 'Pengiriman Dibatalkan',
            default     => 'Status Tidak Diketahui',
        };
    }
}
