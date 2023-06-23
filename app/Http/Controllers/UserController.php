<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationConfifrmation;
use App\Models\Baby;
use App\Models\Configuration;
use App\Models\Role;
use App\Models\User;
use App\Traits\HelperTrait;
//use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class UserController extends Controller
{
    use  HelperTrait;
    private $isAdmin = false;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $role_name = $request->user()->role->name;
            if ($role_name == config("constants.ADMIN")) {
                $this->isAdmin = true;
            } else {
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
        if (!$this->isAdmin) {
            return redirect()->route('dashboard');
        }
        $users = User::with('role', 'baby')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'baby' => $user->baby,
                    'phone_number' => $user->phone_number,
                    'address' => $user->address,
                    'created_at' => $user->created_at,
                    'is_suspended' => $user->is_suspended,
                    'is_phone_number_verified' => $user->is_phone_number_verified
                ];
            });

        return Inertia::render('Users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $allRoles = Role::all();
        $babies = Baby::all();
        return Inertia::render('Users/Create', ['roles' => $allRoles, 'babies' => $babies]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required',
                'role_id' => 'required',
                // 'baby_id'=>'required',
                'phone_number' => 'required',
                'address' => 'required',
                'title' => 'required'
            ]);

            //get user password

            $password =  $this->generateRandomPassword();

            //email the user
            $names = $request->title . ' ' . $request->first_name . ' ' . $request->last_name;

            Mail::to($request->email)->cc('katznicho@gmail.com')->send(new RegistrationConfifrmation($names, $request->email, $password));



            //create user
            $created_user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'role_id' => $request->role_id,
                'baby_id' => $request->baby_id,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'title' => $request->title,
                'password' => Hash::make($password),
            ]);

            //updata the baby
            if ($request->baby_id) {
                Baby::where('id', $request->id)->update(['user_id' => $created_user->id]);
            }



            //create user configurations
            $notificationsConfigurations = config("constants.NOTIFICATIONS_CONFIG");

            foreach ($notificationsConfigurations as $config) {
                Configuration::create([
                    'category' => $config['category'],
                    'user_id' => $created_user->id,
                    'name' => $config['name'],
                    'description' => $config['description'],
                    'value' => $config['value'],
                    'enabled' => $config['enabled']

                ]);
            }

            $deviceConfigurations = config("constants.DEVICE_CONFIG");

            foreach ($deviceConfigurations as $config) {
                Configuration::create([
                    'category' => $config['category'],
                    'user_id' => $created_user->id,
                    'name' => $config['name'],
                    'description' => $config['description'],
                    'value' => $config['value'],
                    'enabled' => $config['enabled']


                ]);
            }

            $securityConfigurations = config("constants.SECURITY_CONFIG");

            foreach ($securityConfigurations as $config) {
                Configuration::create([
                    'category' => $config['category'],
                    'user_id' => $created_user->id,
                    'name' => $config['name'],
                    'description' => $config['description'],
                    'value' => $config['value'],
                    'enabled' => $config['enabled']
                ]);
            }


            //return to index
            return redirect()->route('users.index')->with('success', 'User created successfully');
        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
            return redirect()->back()->with([
                'error' => 'Error creating user',
                'message' => $th->getMessage()

            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
