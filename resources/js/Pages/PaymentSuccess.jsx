import React from 'react';
import { usePage, Link } from '@inertiajs/react';

const PaymentSuccess = () => {
    const { order_id } = usePage().props;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>
                <p className="mt-4 text-gray-600">
                    Your payment for order <strong className="text-gray-900">#{order_id}</strong> has been successfully processed.
                </p>
                <p className="mt-2 text-gray-600">Thank you for your purchase! You can now continue to enjoy your game or check your order details.</p>
                <Link 
                    href="/store" 
                    className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition">
                    Go to Orders
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;