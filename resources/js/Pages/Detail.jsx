import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation/Navigation";
import Navbar2 from "@/Components/Navbar/Navbar2";
import { useCart } from "@/Contexts/CartContext";
import RelatedProducts from "@/Components/RelateProduct/RelateProduct";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Detail = ({ product, variants }) => {
    const { addToCart, cart } = useCart();
    const uniqueColors = [...new Set(variants.map((variant) => variant.color))];
    const uniqueSizes = [...new Set(variants.map((variant) => variant.size))];

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);

    // State untuk modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleAddToCart = () => {
        if (!selectedSize) {
            setModalMessage("Please select a size!");
            setIsModalOpen(true);
            return;
        }

        const selectedVariant = variants.find(
            (v) => v.color === selectedColor && v.size === selectedSize
        );

        if (!selectedVariant) {
            setModalMessage("Invalid variant selection!");
            setIsModalOpen(true);
            return;
        }

        addToCart({ 
            id: selectedVariant.id,  
            product_id: product.id,  
            name: product.name,
            price: selectedVariant.price,
            quantity: 1
        });

        setModalMessage("Product added to cart!");
        setIsModalOpen(true);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            setModalMessage("Your cart is empty! Please add items before checkout.");
            setIsModalOpen(true);
            return;
        }

        router.post("/checkout", { 
            order_items: cart.map(item => ({
                product_id: product.id,
                variant_id: item.id,
                quantity: item.quantity,
                price: item.price,
            }))
        }, {
            onSuccess: () => {
                setModalMessage("Checkout successful!");
                setIsModalOpen(true);
            },
            onError: (err) => {
                setModalMessage("Checkout failed: SILAHKAN LOGIN TERLEBIH DAHULU, ATAU ANDA BISA MELAKUKAN PEMBELIAN TANPA LOGIN MELALUI ORDER VIA WHATSAPP");  
                setIsModalOpen(true);
            }
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
                        <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-white hover:text-black border border-black transition-all" onClick={handleCheckout}>
                        Add to Cart
                        </button>
                        <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-white hover:text-black border border-black transition-all" onClick={handleCheckout}>
                            Check Out
                        </button>
                        <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-md hover:bg-green-500 hover:text-white border border-black transition-all" onClick={handleCheckout}>
                            Via WhatsApp
                        </button>
                    </div>
                </div>
            </div>

            <RelatedProducts />

            {/* Modal Modern */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notification</DialogTitle>
                        <DialogDescription>{modalMessage}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Detail;
