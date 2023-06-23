<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Sensor;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\LogTrait;

class SensorController extends Controller
{
    use LogTrait;
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
    public function index(Request $request)
    {


        $sensors = Sensor::when(!$this->isAdmin, function ($query) use ($request) {
            return $query->where('user_id', $request->user()->id);
        })
            ->with('user')
            ->with('device')
            ->get()
            ->map(function ($device) {
                return [
                    'id' => $device->id,
                    'name' => $device->name,
                    'user' => $device->user,
                    'device' => $device->device,
                    'type' => $device->type,
                    'location' => $device->location,
                    'status' => $device->status,
                    'version' => $device->version,
                    'model' => $device->model,
                    'created_at' => $device->created_at,
                    'updated_at' => $device->updated_at

                ];
            });
        return Inertia::render('Sensors/Index', ['sensors' => $sensors]);
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
        $devices = Device::all();
        return Inertia::render('Sensors/Create', ['users' => $users,  'devices' => $devices]);
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
            'name' => 'required|string|max:255',
            'version' => 'required',
            'model' => 'required',
            'owner' => 'required',
            'location' => "required",
            'type' => "required",
            'device_id' => 'required'
        ]);

        $sensor = Sensor::create([
            'name' => $request->input('name'),
            'version' => $request->input("version"),
            'model' => $request->input("model"),
            'user_id' => $request->owner,
            'location' => $request->location,
            'type' => $request->type,
            'status' => "NOT CONNECTED",
            'device_id' => $request->device_id

        ]);

        $this->createActivityLog("Sensor addition", "User added successfully", "web", "Informational");
        return redirect()->route('sensors.index')->with('success', 'Sensor created successfully!');;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function show(Sensor $sensor)
    {
        //
        $sensor = sensor::find($sensor->id);
        return Inertia::render('Sensors/Show', [
            'sensor' => [
                'id' => $sensor->id,
                'name' => $sensor->name,
                'user' => $sensor->user,
                'device'=>$sensor->device,
                'type' => $sensor->type,
                'location' => $sensor->location,
                'status' => $sensor->status,
                'version' => $sensor->version,
                'model' => $sensor->model,
                'created_at'=>$sensor->created_at,
                'updated_at'=>$sensor->updated_at
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function edit(Sensor $sensor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sensor $sensor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sensor  $sensor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sensor $sensor)
    {
        //
    }
}
