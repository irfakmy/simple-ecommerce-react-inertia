import { useCart } from "../../Contexts/CartContext";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar/Navbar2";
import Navigation from "@/Components/Navigation/Navigation";
import Footer from "@/Components/Footer/Footer";

export default function Cart() {
    const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const [isCheckoutOpen, setCheckoutOpen] = useState(false);
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});

    if (!cart || cart.length === 0) {
        return <p className="text-center text-gray-500 mt-10">Keranjang belanja kosong.</p>;
    }

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalAmount = subtotal;

    const handleCheckout = () => {
        setCheckoutOpen(true);
    };

    const handleConfirmCheckout = () => {
        const newErrors = {};
        if (!customer.name) newErrors.name = "Nama wajib diisi";
        if (!customer.email) newErrors.email = "Email wajib diisi";
        if (!customer.phone) newErrors.phone = "Nomor HP wajib diisi";
        else if (customer.phone.length < 10) newErrors.phone = "Nomor HP minimal 10 karakter";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        router.post(
            "/checkout",
            {
                customer_name: customer.name,
                customer_email: customer.email,
                customer_phone: customer.phone,
                subtotal: subtotal,
                total_amount: totalAmount,
                order_items: cart.map((item) => ({
                    product_id: item.product_id,
                    product_variant_id: item.id ?? null,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
            {
                onSuccess: (response) => {
                    clearCart();
                    if (response.props.snap_token) {
                        window.location.href = `https://app.sandbox.midtrans.com/snap/v2/vtweb/${response.props.snap_token}`;
                    }
                },
                onError: (err) => {
                    alert("Checkout gagal: " + JSON.stringify(err));
                },
            }
        );
    };

    return (
        <div className="">
            <Navbar />
            <Navigation />
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-sm">
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
                        <button onClick={clearCart} className="w-full md:w-auto px-5 py-2 bg-red-500 text-white rounded hover:bg-white hover:text-black border">
                            Kosongkan Keranjang
                        </button>
                        <button onClick={handleCheckout} className="w-full md:w-auto hover:bg-white hover:text-black border border-black px-5 py-2 bg-black text-white rounded hover:bg-gray-900">
                            Checkout
                        </button>
                    </div>
                </div>
                {isCheckoutOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Isi Data Checkout</h3>
                            <div className="mb-3">
                                <label className="block font-semibold">Nama</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={customer.name}
                                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="block font-semibold">Email</label>
                                <input
                                    type="email"
                                    className="w-full border p-2 rounded"
                                    value={customer.email}
                                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="block font-semibold">Nomor HP</label>
                                <input
                                    type="tel"
                                    className="w-full border p-2 rounded"
                                    value={customer.phone}
                                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setCheckoutOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                                    Batal
                                </button>
                                <button onClick={handleConfirmCheckout} className="px-4 py-2 bg-black text-white rounded">
                                    Konfirmasi
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </div>
    );
}
