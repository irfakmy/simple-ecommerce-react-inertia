import { Link, usePage } from '@inertiajs/react';
import { useState } from "react";
import { ShoppingBag, Store} from 'lucide-react';

export default function Navbar() {
    const { categories } = usePage().props;
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
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/faqs" className="hover:underline font-bold">FAQs</Link>
                    <button className="p-2 border rounded-full flex items-center justify-center w-10 h-10">
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </nav>
        </div>
    );
}
