import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation/Navigation";
import Navbar2 from "@/Components/Navbar/Navbar2";
import { useCart } from "@/Contexts/CartContext";
import RelatedProducts from "@/Components/RelateProduct/RelateProduct";

const Detail = ({ product, variants }) => {
    const { addToCart, cart } = useCart();
    const uniqueColors = [...new Set(variants.map((variant) => variant.color))];
    const uniqueSizes = [...new Set(variants.map((variant) => variant.size))];

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size!");
            return;
        }
    
        const selectedVariant = variants.find(
            (v) => v.color === selectedColor && v.size === selectedSize
        );
    
        if (!selectedVariant) {
            alert("Invalid variant selection!");
            return;
        }
    
        addToCart({ 
            id: selectedVariant.id,  // ID dari varian produk (product_variants)
            product_id: product.id,  // Pastikan product_id ikut dikirim
            name: product.name,
            price: selectedVariant.price,
            quantity: 1
        });
    
        alert("Product added to cart!");
    };
    

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before checkout.");
            return;
        }
    
        if (!customerName || !customerEmail || !customerPhone) {
            alert("Please fill in your customer details before checkout.");
            return;
        }
    
        router.post("/checkout", { 
            customer_name: customerName, 
            customer_email: customerEmail, 
            customer_phone: customerPhone, 
            order_items: cart.map(item => ({
                product_id: product.id,  // Gunakan product.id agar valid
                variant_id: item.id,  // ID dari product_variants (opsional, bisa di-backend)
                quantity: item.quantity,
                price: item.price,
            }))
        }, {
            onSuccess: () => alert("Checkout successful!"),
            onError: (err) => alert("Checkout failed: " + JSON.stringify(err))
        });
    };
    

    return (
        <div>
            <Navbar2 />
            <Navigation />
            <div className="flex ml-5 mt-3">
                <Link href="/store">
                    <span className="flex font-bold">
                        <ArrowLeft /> Go Back
                    </span>
                </Link>
            </div>
            {/* Detail Produk */}
            <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-lg shadow-sm">
                <div className="flex justify-center">
                    <img src={`/img/${product.image}`} alt={product.name} className="w-96 h-96 object-cover rounded-xl shadow-md" />
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                    <h1 className="text-xl font-bold uppercase">{product.name}</h1>
                    <Star className="text-yellow-400 mt-1" />
                    <p className="text-3xl font-semibold text-red-800 mt-2">
                        Rp {product.price}
                    </p>

                    {/* Pilihan Warna */}
                    <div className="mt-6">
                        <p className="font-semibold text-gray-700">Color</p>
                        <div className="flex gap-2 mt-2">
                            {uniqueColors.map((color, index) => (
                                <button
                                    key={index}
                                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "border-black scale-110" : "border-gray-300"} transition-transform`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Pilihan Ukuran */}
                    <div className="mt-6">
                        <p className="font-semibold text-gray-700">Size</p>
                        <div className="flex gap-3 mt-2">
                            {uniqueSizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={`px-6 py-2 border rounded-lg font-medium transition-all ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tombol */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold shadow-md hover:bg-gray-900 transition-all" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-white hover:text-black border border-black transition-all" onClick={handleCheckout}>
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
            <RelatedProducts />
        </div>
    );
};

export default Detail;
