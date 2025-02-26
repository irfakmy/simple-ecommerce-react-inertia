import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ShoppingBag, ChevronDown, Search } from "lucide-react";

export default function Navigation() {
  const { categories } = usePage().props;
  const { genders } = usePage().props;
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 shadow-sm rounded-xl w-full md:justify-between">
      {/* Bagian Kategori */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
            className="flex items-center px-4 py-2 bg-gray-100 rounded-full w-full md:w-auto"
          >
            {selectedCategory} <ChevronDown className="ml-auto md:ml-2 w-6 h-4" />
          </button>
          {isCategoryOpen && (
            <div className="absolute top-full left-0 md:left-auto w-full md:w-48 mt-1 bg-white border rounded-lg shadow-lg z-50">
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

        {/* Input Pencarian */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Cari produk..."
            className="px-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-black w-full"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Tombol Kategori */}
      <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
        {genders.map((gender, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white border rounded-full hover:bg-gray-200"
            >
              {gender}
            </button>
          ))}
      </div>
    </div>
  );
}
