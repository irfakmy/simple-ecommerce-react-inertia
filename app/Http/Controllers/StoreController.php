<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
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
        $genders = Product::select('gender')->distinct()->pluck('gender');
    
        $categories = Category::whereNull('parent_id')
            ->with('children:id,name,slug,parent_id')
            ->get(['id', 'name', 'slug']);
    
        return inertia('Guest/Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'genders' => $genders,
            'categories' => $categories,
        ]);
    }

    public function cart(Request $request){
        $products = Product::select('id', 'image')->get();
        return Inertia::render('Product/Cart', [
            'products' => $products
        ]);
    }
    
}
