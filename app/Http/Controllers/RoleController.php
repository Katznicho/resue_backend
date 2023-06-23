<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Termwind\Components\Dd;
use App\Traits\LogTrait;


class RoleController extends Controller
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
    public function index()
    {
        //
        $roles = Role::all()
            ->map(function ($role) {
                return [
                    'id' => $role->id,
                    'role' => $role->name,
                    'description' => $role->description,
                    'permissions' => $role->permissions,
                    'created_at' => $role->created_at,
                    'updated_at' => $role->updated_at
                ];
            });

        return Inertia::render('Roles/Index', ['roles' => $roles]);
    }

    //0750687790
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render('Roles/Create');
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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'required|array',
        ]);

        // Create a new role instance with the validated data
        $role = new Role([
            'name' => $validatedData['name'],
            'description' => $request->input('description'),
            'permissions' => json_encode($validatedData['permissions']),
        ]);

        // Save the role to the database
        $role->save();

        $this->createActivityLog("Role addition", "A role was added", "web", "Informational");
        // Redirect to the roles index page with a success message
        return redirect()->route('roles.index')->with('success', 'Role created successfully!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        $role = Role::find($role->id);
        // Retrieve the role by ID and pass it to the view
        return Inertia::render('Roles/Show', ['role' => [
            'id' => $role->id,
            'name' => $role->name,
            'description' => $role->description,
            'permissions' => json_decode($role->permissions),
            'created_at' => $role->created_at,
            'updated_at' => $role->updated_at,
        ]]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        //
        $role = Role::find($role->id);
        $this->createActivityLog("Show Role Form", "A Role was Editted", "web", "Informational");
        // Retrieve the role by ID and pass it to the view
        return Inertia::render('Roles/Edit', ['role' => [
            'id' => $role->id,
            'name' => $role->name,
            'description' => $role->description,
            'permissions' => json_decode($role->permissions),
            'created_at' => $role->created_at,
            'updated_at' => $role->updated_at,
        ]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        // Validate the role name and permissions
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'required|array',
            'description' => 'nullable|string|max:255'
        ]);


        // Save the role to the database
        Role::where('id', $role->id)->update([
            'name' => $validatedData['name'],
            'description' => $request->input('description'),
            'permissions' => json_encode($validatedData['permissions']),
        ]);

        // Redirect to the roles index page with a success message
        return redirect()->route('roles.index')->with('success', 'Role updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        //
        // Find the role by ID
        $role = Role::find($role->id);
        $role->delete();

        // Redirect to the roles index page with a success message
        return redirect()->route('roles.index')->with('success', 'Role deleted successfully!');
    }
}
