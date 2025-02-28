import { useCart } from "../Contexts/CartContext";
import { router } from "@inertiajs/react";

export default function Cart() {
    const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

    if (!cart || cart.length === 0) {
        return <p className="text-center text-gray-500 mt-10">Keranjang belanja kosong.</p>;
    }

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalAmount = subtotal;

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Keranjang masih kosong. Tambahkan produk sebelum checkout.");
            return;
        }

        const customerName = prompt("Masukkan nama Anda:");
        const customerEmail = prompt("Masukkan email Anda:");
        let customerPhone = prompt("Masukkan nomor HP Anda:");

        if (!customerName || !customerEmail || !customerPhone) {
            alert("Semua data pelanggan harus diisi!");
            return;
        }

        if (customerPhone.length < 10) {
            alert("Nomor HP harus minimal 10 karakter!");
            return;
        }

        router.post("/checkout", {
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            subtotal: subtotal,
            total_amount: totalAmount,
            order_items: cart.map(item => ({
                product_id: item.product_id,
                product_variant_id: item.id ?? null,
                quantity: item.quantity,
                price: item.price,
            }))
        }, {
            onSuccess: (response) => {
                if (response.props.flash.success) {
                    clearCart();
                    if (response.props.snap_token) {
                        window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${response.props.snap_token}`;
                    }
                }
            },
            onError: (err) => {
                alert("Checkout gagal: " + JSON.stringify(err));
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Keranjang Belanja</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="p-3">Produk</th>
                                <th className="p-3">Harga</th>
                                <th className="p-3">Jumlah</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
    {cart.map((item) => (
        <tr key={item.product_id} className="border-b border-gray-200 text-gray-700">
            <td className="p-3">{item.name}</td>
            <td className="p-3">Rp {item.price.toLocaleString()}</td>
            <td className="p-3 flex items-center justify-center gap-2">
                <button onClick={() => decreaseQuantity(item.product_id)} className="px-2 py-1 bg-gray-300 text-black rounded">-</button>
                <span className="text-lg">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="px-2 py-1 bg-gray-300 text-black rounded">+</button>
            </td>
            <td className="p-3">Rp {(item.price * item.quantity).toLocaleString()}</td>
            <td className="p-3">
                <button onClick={() => removeFromCart(item.product_id)} className="px-3 py-1 bg-red-500 text-white rounded">Hapus</button>
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-gray-800">Total: Rp {totalAmount.toLocaleString()}</h3>
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <button onClick={clearCart} className="w-full md:w-auto px-5 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Kosongkan Keranjang</button>
                        <button onClick={handleCheckout} className="w-full md:w-auto px-5 py-2 bg-black text-white rounded hover:bg-gray-900">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
