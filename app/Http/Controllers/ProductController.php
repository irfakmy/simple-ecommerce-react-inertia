<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Route;


class ProductController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Product::with('category.parent');
    
        // **Filter berdasarkan kategori (termasuk kategori anak)**
        if ($request->has('category') && !empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category)
                  ->orWhereHas('parent', function ($p) use ($request) {
                      $p->where('slug', $request->category);
                  });
            });
        }
    
        // **Filter berdasarkan pencarian**
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
    
        // Ambil produk yang sudah difilter
        $products = $query->paginate(10)->appends(request()->query());
    
        $category = Category::whereNull('parent_id')
            ->with('children:id,name,slug,parent_id')
            ->get(['id', 'name', 'slug']);
    
        return inertia('Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'categories' => $category ?? [],
            'genders' => ['Men', 'Women', 'Unisex'],
            'search' => $request->search,
            'selectedCategory' => $request->category ?? null,
        ]);
    }
    
    

    public function show($id){

        $product = Product::findOrFail($id);
        $variants = ProductVariant::where('product_id', $product->id)->get();
        $genders = Product::select('gender')->distinct()->pluck('gender');
        $categories = Category::whereNull('parent_id')
        ->with('children:id,name,slug,parent_id')
        ->get(['id', 'name', 'slug']);

        $relatedProducts = Product::with('category.parent') // Tambahkan relasi category
        ->where('category_id', $product->category_id)
        ->where('id', '!=', $product->id)
        ->limit(4)
        ->get();

        return inertia('Detail', [
            'product' => $product,
            'variants' => $variants,    
            'genders' => $genders,
            'categories' => $categories,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
