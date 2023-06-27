<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    use LogTrait;
    private $isAdmin = false;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
             $role_name = $request->user()->role->name;
                if($role_name == config("constants.ADMIN")){
                    $this->isAdmin = true;
                }
                else{
                        $this->isAdmin = false;
                }
             return $next($request);
        });
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = ProductCategory::all()
        ->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'image' => url($category->image),
                'created_at' => $category->created_at,
                'updated_at' => $category->updated_at
            ];
        });

    return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
            
                // Validate the request...
                $request->validate([
                    'name' => 'required|unique:product_categories|max:255',
                    'description' => 'required|max:255',
                    'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                ]);
    
                $category = new ProductCategory;
    
                $category->name = $request->name;
                $category->slug = $request->description;
                $category->image = $request->image->store('categories', 'public');
                //user_id
                $category->user_id = $request->user()->id;
                $category->save();
    
                return redirect()->route('categories.index')
                    ->with('success', 'Category created successfully.');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
