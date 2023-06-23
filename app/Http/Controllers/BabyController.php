<?php

namespace App\Http\Controllers;

use App\Models\Baby;
use App\Models\User;
use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BabyController extends Controller
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
        $babies = Baby::when(!$this->isAdmin, function ($query) use ($request) {
            return $query->where('user_id', $request->user()->id);
        })
        ->with('user')
        ->get()
        ->map(function ($baby) {
            return [
                'id' => $baby->id,
                'name' => $baby->name,
                'gender' => $baby->gender,
                'user' => $baby->user,
                'length' => $baby->length,
                'weight' => $baby->weight,
                'dob' => $baby->dob,
                'medical_condtions' => $baby->medical_conditions,
                'created_at' => $baby->created_at,
                'updated_at' => $baby->updated_at
            ];
        });


    // Return the babies to the 'Baby/Index' Inertia view
    return Inertia::render('Baby/Index', ['babies' => $babies]);



    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $users = User::all();

        return Inertia::render('Baby/Create',['users'=>$users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the role name and permissions
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'medical_conditions' => 'nullable|array',
            'gender'=>'required',
            'weight'=>'required',
            'dob'=>'required',
            'length'=>"required",
        ]);

        


        $baby = Baby::create([
            'name' => $request->input('name'),
            'gender' => $request->input('gender'),
             'user_id' => $request->input('owner'),
            'length' => $request->input('length'),
            'weight' => $request->input('weight'),
            'dob' => $request->input('dob'),
            'medical_conditions' => json_encode($request->input('medical_conditions')),
        ]);

        if($request->owner){
            User::where('baby_id', $baby->id)->update(['id'=>$request->owner]);
        }
       //log activity
       $this->createActivityLog("Baby addition", "A baby was added", "web", "Informational");
        return redirect()->route('babies.index')->with('success', 'Baby created successfully!');;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Baby  $baby
     * @return \Illuminate\Http\Response
     */
    public function show(Baby $baby)
    {
        //
         $baby = Baby::find($baby->id);
        return Inertia::render('Baby/Show', [
            'baby' => [
                'id' => $baby->id,
                'name' => $baby->name,
                'gender' => $baby->gender,
                'user'=>$baby->user,
                'length'=>$baby->length,
                'weight'=>$baby->weight,
                'dob'=>$baby->dob,
                'medical_conditions'=>json_decode($baby->medical_conditions),
                'created_at'=>$baby->created_at,
                'updated_at'=>$baby->updated_at
            ]

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Baby  $baby
     * @return \Illuminate\Http\Response
     */
    public function edit(Baby $baby)
    {
        //
        $baby = Baby::find($baby->id);
        $users = User::all();
        $this->createActivityLog("Show Baby Form", "A baby was Editted", "web", "Informational");

    return Inertia::render('Baby/Edit', [
        'baby' => [
            'id' => $baby->id,
            'name' => $baby->name,
            'gender' => $baby->gender,
            'user' => $baby->user,
            'length' => $baby->length,
            'weight' => $baby->weight,
            'dob' => $baby->dob,
            'medical_conditions' =>json_decode($baby->medical_conditions),
            'created_at' => $baby->created_at,
            'updated_at' => $baby->updated_at
        ],
        'users' => $users
    ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Baby  $baby
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Baby $baby)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'medical_conditions' => 'nullable|array',
            'gender'=>'required',
            'weight'=>'required',
            'dob'=>'required',
            'length'=>"required",
        ]);

        $baby->update([
            'name' => $request->input('name'),
            'gender' => $request->input('gender'),
            'length' => $request->input('length'),
            'weight' => $request->input('weight'),
            'dob' => $request->input('dob'),
            'medical_conditions' => json_encode($request->input('medical_conditions')),
        ]);

        return redirect()->route('babies.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Baby  $baby
     * @return \Illuminate\Http\Response
     */
    public function destroy(Baby $baby)
    {
        //
        $baby->delete();

    return redirect()->route('babies.index');
    }
}
