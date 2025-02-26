import { Link, usePage } from "@inertiajs/react";
import { Star } from "lucide-react";

const RelatedProducts = () => {
    const { relatedProducts = [] } = usePage().props;

    if (relatedProducts.length === 0) {
        return <p className="text-gray-500 text-center">No related products available.</p>;
    }

    return (
        <div className="mt-10 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-3">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {relatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-transform transform hover:scale-105"
                    >
                        {/* Gambar */}
                        <div className="relative w-full h-56">
                            <Link href={`/detail/${product.id}`} className="block w-full h-full">
                                <img
                                    src={`/img/${product.image}`} 
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-0"
                                />
                                <img
                                    src={`/img/${product.image_hover}`} 
                                    alt="Hover Image"
                                    className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                />
                            </Link>
                        </div>

                        {/* Detail Produk */}
                        <div className="p-4">
                            <h3 className="text-md font-semibold text-gray-900">{product.name}</h3>
                            <div className="flex items-center mt-2 mb-3">
                                <Star className="text-yellow-500 w-4 h-4" />
                                <span className="bg-black text-white text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-2 truncate">
                                    {product.category 
                                        ? product.category.parent 
                                            ? `${product.category.parent.name} (${product.category.name})` 
                                            : product.category.name
                                        : "Uncategorized"}
                                </span>
                            </div>
                            <p className="text-xs text-gray-600">Stok: {product.stock}</p>
                            <p className="text-lg font-bold text-black mt-2">Rp {product.price.toLocaleString()}</p>
                            <div className="mt-4">
                                <Link
                                    href={`/detail/${product.id}`}
                                    className="block text-center text-white bg-black hover:bg-white hover:text-black transition-colors font-bold border border-black rounded-lg text-sm px-5 py-2.5"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
