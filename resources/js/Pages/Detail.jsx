import { useState } from "react";
import {ArrowLeft,Star} from 'lucide-react'
import { Link, router } from "@inertiajs/react";
import Navigation from "@/Components/Navigation/Navigation";
import Navbar2 from "@/Components/Navbar/Navbar2";
import RelatedProducts from "@/Components/RelateProduct/RelateProduct";

const Detail = ({ product, variants }) => {
    const images = [product.image]; // Bisa dikembangkan dengan banyak gambar
    const uniqueColors = [...new Set(variants.map((variant) => variant.color))];
    const uniqueSizes = [...new Set(variants.map((variant) => variant.size))];

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);

    // Fungsi tambah ke keranjang
    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size");
            return;
        }
        router.post("/cart", {
            product_id: product.id,
            size: selectedSize,
            color: selectedColor,
        });
    };

    return (
        <div className="">
            {/* <Navbar2 /> */}
            <Navigation />
            <div className="flex ml-5 mt-3">
            <Link href="/store"><span className="flex font-bold"><ArrowLeft/>Go Back</span></Link>
            </div>
        <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-lg shadow-sm">
            {/* Gambar Produk */}
            <div className="flex justify-center">
                <img src={`/img/${product.image}`} alt={product.name} className="w-96 h-96 object-cover rounded-xl shadow-md" />
            </div>

            {/* Detail Produk */}
            <div className="p-6 bg-white rounded-xl shadow-md">
                <h1 className="text-xl font-bold uppercase">{product.name}</h1>
                <p className="text-sm text-gray-600">{product.gender}</p>
                <Star className="text-yellow-400 mt-1"/>
                <p className="text-3xl font-semibold text-red-800 mt-2">Rp {product.price}</p>
                <p className="text-sm font-semibold mt-2">Stock: {product.stock}</p>

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

                {/* Tombol Add to Cart */}
                <div className="flex justify-center gap-2">
                <button 
                    className="w-full mt-8 px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-md hover:bg-black hover:text-white border border-black transition-all"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
                <button 
                    className="w-full mt-8 px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-white hover:text-black border border-black transition-all"
                    onClick={addToCart}
                >
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
