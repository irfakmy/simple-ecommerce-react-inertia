import { Link } from "@inertiajs/react";

export default function Banner() {
  return (
    <div className="relative border-b border-black w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-white text-center overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn text-black">Welcome to Our Store</h1>
        <p className="text-sm md:text-lg mb-6 animate-fadeIn delay-200 text-black">
          Discover amazing products with great deals and discounts.
        </p>
        <Link href="/store">
        <button className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition duration-300 animate-fadeIn delay-400">
          Shop Now
        </button>
        </Link>
      </div>
    </div>
  );
}