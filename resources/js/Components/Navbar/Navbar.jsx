import { Link, usePage } from '@inertiajs/react';
import { useState } from "react";
import { AlignLeft, ShoppingBag, ChevronDown, Search } from 'lucide-react';

export default function Navbar() {
    const { categories } = usePage().props; // Ambil kategori dari Laravel
    const [selectedCategory, setSelectedCategory] = useState("Categories");
    const [isVisible, setIsVisible] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    console.log(categories);

    return (
        <div className="relative">
            <nav className="flex items-center justify-between p-4 border-b">
                <button onClick={() => setIsVisible(!isVisible)} className="p-2">
                    <AlignLeft />
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

            {/* Navigation */}
            {isVisible && (
                <div id='navigation' className="flex flex-wrap items-center gap-4 bg-white p-4 shadow-sm rounded-xl w-full md:justify-between">
                    <div className="flex sm:flex-wrap items-center gap-4 w-full md:w-auto truncate">
                        {/* Kategori Dropdown */}
                        <div className="static w-full md:w-auto z-50">
                        <button 
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className="flex items-center px-4 py-1 bg-gray-100 rounded-full w-full md:w-auto"
                            >
                                {selectedCategory} <ChevronDown className="ml-auto md:ml-2 w-6 h-4" />
                            </button>

                            {/* Dropdown Kategori dengan absolute positioning */}
                            {isCategoryOpen && (
                                <div className="absolute top-full left-12 md:w-auto mt-1 bg-white border rounded-lg shadow-lg z-50">
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => {
                                                    setSelectedCategory(category.name);
                                                    setIsCategoryOpen(false);
                                                }}
                                                className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                            >
                                                {category.name}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="px-4 py-2 text-gray-500">No categories available</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* Input Search */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-1 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-0"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
