import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

const CheckoutPage = ({ snap_token, order }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const { post } = useForm();

    useEffect(() => {
        if (window.snap) {
            window.snap.pay(snap_token, {
                onSuccess: function (result) {
                    console.log("Payment success", result);
                    setPaymentStatus('success');
                    handlePaymentStatus(result, 'success');
                },
                onPending: function (result) {
                    console.log("Payment pending", result);
                    setPaymentStatus('pending');
                    handlePaymentStatus(result, 'pending');
                },
                onError: function (result) {
                    console.log("Payment failed", result);
                    setPaymentStatus('failed');
                    handlePaymentStatus(result, 'failed');
                },
            });
        }
    }, [snap_token]);

    const handlePaymentStatus = (result, status) => {
        setIsLoading(true);
        post('/checkout/status', {
            status: status,
            order_id: order.id,
            result: result,
        }, {

            onSuccess: () => {
                if (status === 'settlement') {
                    Inertia.visit('/paymentnotification/paymentsuccess');
                }
            }
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>
                <div className="space-y-4">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Customer Name:</strong> {order.customer_name}</p>
                    <p><strong>Total Amount:</strong> {order.total_amount}</p>
                </div>

                {paymentStatus && (
                    <div className={`mt-4 p-4 rounded-lg text-center ${paymentStatus === 'success' ? 'bg-green-100 text-green-700' : paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : paymentStatus === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                        {paymentStatus === 'success' && <p>Payment was successful!</p>}
                        {paymentStatus === 'pending' && <p>Payment is pending...</p>}
                        {paymentStatus === 'failed' && <p>Payment failed. Please try again.</p>}
                        {paymentStatus === 'error' && <p>There was an error processing your payment.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
