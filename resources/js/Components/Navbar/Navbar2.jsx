import { Link, usePage } from '@inertiajs/react';
import { useState } from "react";
import { ShoppingBag, Store} from 'lucide-react';
import { useCart } from "@/Contexts/CartContext";

export default function Navbar() {
    const { categories } = usePage().props; 
    const { cart } = useCart();
    const [isVisible, setIsVisible] = useState(false);


    console.log(categories);

    return (
        <div className="relative">
            <nav className="flex items-center justify-between p-4 border-b">
                <button onClick={() => setIsVisible(!isVisible)} className="p-2">
                    <Store />
                </button>
                <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center text-lg font-bold">
                    <span className="text-xl font-bold">E - </span>
                    <span className="ml-1 font-bold">Commerce</span>
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium">
    {/* <Link href="/about" className="hover:underline">About</Link>
    <Link href="/faqs" className="hover:underline font-bold">FAQs</Link> */}
    <Link href="/cart" className="relative">
        <button className="p-2 border rounded-full flex items-center justify-center w-10 h-10">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                </span>
            )}
        </button>
    </Link>
</div>

            </nav>
        </div>
    );
}
