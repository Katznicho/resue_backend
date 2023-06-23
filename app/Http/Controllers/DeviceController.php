<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Sensor;
use App\Models\User;
use App\Traits\HelperTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\LogTrait;

class DeviceController extends Controller
{


    use LogTrait, HelperTrait;
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
        $devices = Device::when(!$this->isAdmin, function ($query) use ($request) {
            return $query->where('user_id', $request->user()->id);
        })
            ->with('user')
            ->with('sensors')
            ->get()
            ->map(function ($device) {
                return [
                    'id' => $device->id,
                    'name' => $device->name,
                    'user' => $device->user,
                    'type' => $device->type,
                    'location' => $device->location,
                    'device_serial_number' => $device->device_serial_number,
                    'status' => $device->status,
                    'version' => $device->version,
                    'model' => $device->model,
                    'created_at' => $device->created_at,
                    'updated_at' => $device->updated_at

                ];
            });
        return Inertia::render('Devices/Index', ['devices' => $devices]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render('Devices/Create', ['users' => $users]);
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
         $request->validate([
            'name' => 'required|string|max:255',
            'version' => 'required',
            'model' => 'required',
            'owner' => 'required',
            'location' => "required",
            'type' => "required",
        ]);

        $devices = Device::create([
            'name' => $request->input('name'),
            'version' => $request->input("version"),
            'model' => $request->input("model"),
            'user_id' => $request->owner,
            'location' => $request->location,
            'type' => $request->type,
            'status' => "NOT CONNECTED",
            'device_serial_number' =>$this->genereteDeviceSerialNumber(),

        ]);

        $this->createActivityLog("Device Addition", "A Device was added", "web", "Informational");
        return redirect()->route('devices.index')->with('success', 'Device created successfully!');;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $device = Device::find($id);
        return Inertia::render('Devices/Show', [
            'device' => [
                'id' => $device->id,
                'name' => $device->name,
                'user' => $device->user,
                'sensors'=>$device->sensors,
                'type' => $device->type,
                'location' => $device->location,
                'status' => $device->status,
                'version' => $device->version,
                'model' => $device->model,
                'created_at'=>$device->created_at,
                'updated_at'=>$device->updated_at
            ]
        ]);


    }



    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function edit(Device $device)
    {
        //
        dd("am here");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Device $device)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Device  $device
     * @return \Illuminate\Http\Response
     */
    public function destroy(Device $device)
    {
        //
    }

    public function updateDeviceConfig(Request $request){

        $request->validate(['device_configurations' => 'required|array']);
        $user_id = $request->user()->id;

         try {
            foreach($request->device_configurations[0]['sensors'] as $sensor){
                Sensor::find($sensor['id'])->update(
                  [
                     'status'=>$sensor['status']
                  ]
                );
             }
              Device::find($request->device_configurations[0]['id'])->update(['status'=>$request->device_configurations[0]['status']]);

              if($request->device_configurations[0]['status']== "NOT CONNECTED"){
                    Sensor::where('device_id', '=',$request->device_configurations[0]['id'])->update([
                         'status'=>'NOT CONNECTED'
                    ]);
              }
              $this->createActivityLog("Updated Notifications", "Updated notifications settings", "web", "Informational");
              return redirect()->back()->with('success', 'Device Configurations updated successfully');
         } catch (\Throwable $th) {
            //throw $th;
            $this->createActivityLog("Updating Device Configurations", "Failed to update device  settings ", "web", "Error");
            return redirect()->back()->withErrors(['message' => "failure", "error" => $th->getMessage()]);
         }


    }
}
