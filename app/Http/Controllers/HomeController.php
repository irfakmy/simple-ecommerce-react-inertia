<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    //
    public function index(Request $request){

        $query = Product::with('category.parent');

        if ($request->has('search') && !empty($request->search)) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $products = $query->paginate(10);
        // dd($products->items());

        $category = Category::whereNull('parent_id')
        ->with('children:id,name,slug,parent_id')
        ->get(['id','name','slug']);

        return inertia('LandingPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'products' => $products,
            'categories' => $category,
        ]);
    }
}
