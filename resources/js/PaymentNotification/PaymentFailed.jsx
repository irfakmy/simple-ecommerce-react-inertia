uimport { usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const PaymentFailed = () => {
    const { order_id } = usePage().props;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
                <p className="text-gray-700 mt-2">
                    Your payment for order <strong className="text-gray-900">{order_id}</strong> has failed.
                </p>
                <p className="text-gray-600 mt-1">Please try again or contact support if the problem persists.</p>
                <p className="text-gray-500 mt-4">We are sorry for the inconvenience.</p>

                <div className="mt-6 flex flex-col gap-3">
                    <a 
                        href="/checkout"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black font-bold transition"
                    >
                        Retry Payment
                    </a>
                    <a 
                        href="/cart"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Cart
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
