<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Product::with('category.parent');
    
        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
    
        $products = $query->paginate(10);
    
        // Ambil hanya gender unik
        $genders = Product::select('gender')->distinct()->pluck('gender');
    
        $categories = Category::whereNull('parent_id')
            ->with('children:id,name,slug,parent_id')
            ->get(['id', 'name', 'slug']);
    
        return inertia('Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'genders' => $genders, // Kirim daftar gender unik ke frontend
            'categories' => $categories,
        ]);
    }
    
}
