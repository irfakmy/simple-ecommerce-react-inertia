<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'customer_name', 'customer_email', 'customer_phone',
        'subtotal', 'total_amount', 'payment_status', 'shippment_status'
    ];

    /**
     * Relasi ke pengguna.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
