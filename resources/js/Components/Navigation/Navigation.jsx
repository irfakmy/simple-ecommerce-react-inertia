import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { House, ChevronDown, Search } from "lucide-react";

export default function Navigation() {
  const { categories = [], genders = [], search = "" } = usePage().props;
  const [selectedCategory, setSelectedCategory] = useState("Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [query, setQuery] = useState(search || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/product", { search: query, category: selectedCategory !== "Categories" ? selectedCategory : undefined }, { preserveState: true });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setIsCategoryOpen(false);
    router.get("/product", { category: category.slug, search: query }, { preserveState: true });
  };

  return (
    <div className="fixed top-16 left-0 w-full z-40 backdrop-blur-md bg-white/60 border-b border-gray-200 shadow-sm p-4 flex flex-wrap items-center gap-4 md:justify-between">
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
                    onClick={() => handleCategorySelect(category)}
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-200 ${selectedCategory === category.name ? 'bg-gray-300' : ''}`}
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

        <form onSubmit={handleSearch} className="relative w-full md:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="px-4 py-2 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-black w-full"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </form>
      </div>

      <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
        <Link href="/store" className=" bg-white text-black rounded-lg py-1 px-2 flex items-center gap-2 hover:bg-black hover:text-white">
          <House size={20} />
          <span>Home</span>
        </Link>
        {genders.map((gender, index) => (
          <button
            key={index}
            className=" bg-white text-black rounded-lg py-1 px-2 flex items-center gap-2 hover:bg-black hover:text-white"
          >
            {gender}
          </button>
        ))}
      </div>
    </div>
  );
}
