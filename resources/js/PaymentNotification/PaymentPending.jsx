// resources/js/Pages/PaymentPending.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentPending = () => {
    const { order_id } = useParams();  // Mendapatkan order_id dari URL

    return (
        <div className="payment-pending">
            <h1>Payment Pending</h1>
            <p>Your payment for order <strong>{order_id}</strong> is still pending. Please wait for confirmation.</p>
            <p>If you have any questions, please contact customer support.</p>
            <a href="/orders" className="btn btn-primary">Check Order Status</a>
        </div>
    );
};

export default PaymentPending;
