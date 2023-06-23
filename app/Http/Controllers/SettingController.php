<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\LogTrait;
use Inertia\Inertia;

class SettingController extends Controller
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
        $user_id = $request->user()->id;
        $user = User::find($user_id);

        $notifications =  Configuration::where(
            [
                ['user_id', '=', $user_id],
                ['category', '=', config("constants.NOTIFICATIONS_CONFIGURATION")]
            ]
        )->get();
        //  security
        $security =  Configuration::where(
            [
                ['user_id', '=', $user_id],
                ['category', '=', config("constants.SECURITY_CONFIGURATION")]
            ]
        )->get();

        // security

        // device
        $device =  Configuration::where(
            [
                ['user_id', '=', $user_id],
                ['category', '=', config("constants.DEVICE_CONFIGURATION")]
            ]
        )->get();
        // device


        return Inertia::render(
            'Settings/Index',
            [
                'notification_configurations' => $notifications,
                'device_configurations' => $device,
                'security_configurations' => $security
            ]
        );
    }


    public function updateNotifications(Request $request)
    {

        try {
            $request->validate(['notification_configurations' => 'required|array']);
            $user_id = $request->user()->id;

            $notifications = $request->input('notification_configurations');

            foreach ($notifications as $notification) {
                Configuration::where(
                    [
                        ['user_id', '=', $user_id],
                        // ['category', '=', config("constants.NOTIFICATIONS_CONFIGURATION")],
                        ['value', '=', $notification['value']]
                    ]
                )->update([
                    'enabled' => $notification['enabled']
                ]);
            }
            $this->createActivityLog("Updated Notifications", "Updated notifications settings", "web", "Informational");
            return redirect()->back()->with('success', 'Notifications settings updated successfully');
        } catch (\Throwable $th) {
            //throw $th;
            $this->createActivityLog("Updated Notifications", "Failed to update notifications settings ", "web", "Error");
            return redirect()->back()->withErrors(['message' => "failure", "error" => $th->getMessage()]);
        }
    }

    public function updateSecurity(Request $request)
    {

        try {
            $request->validate(['security_configurations' => 'required|array']);
            $user_id = $request->user()->id;

            $security = $request->input('security_configurations');

            foreach ($security as $security) {
                Configuration::where(
                    [
                        ['user_id', '=', $user_id],
                        //['category', '=', config("constants.SECURITY_CONFIGURATION")],
                        ['value', '=', $security['value']]
                    ]
                )->update([
                    'enabled' => $security['enabled']
                ]);
            }
            $this->createActivityLog("Updated Security", "Updated security settings", "web", "Informational");
            return redirect()->back()->with('success', 'Security settings updated successfully');
        } catch (\Throwable $th) {
            //throw $th;
            $this->createActivityLog("Updated Security", "Failed to update security settings ", "web", "Error");
            return redirect()->back()->withErrors(['message' => "failure", "error" => $th->getMessage()]);
        }
    }


    public function updateDevice(Request $request)
    {

        try {
            $request->validate(['device_configurations' => 'required|array']);
            $user_id = $request->user()->id;

            $device = $request->input('device_configurations');

            foreach ($device as $device) {
                Configuration::where(
                    [
                        ['user_id', '=', $user_id],
                        ['category', '=', config("constants.DEVICE_CONFIGURATION")],
                        ['value', '=', $device['value']]
                    ]
                )->update([
                    'enabled' => $device['enabled']
                ]);
            }
            $this->createActivityLog("Updated Device", "Updated device settings", "web", "Informational");
            return redirect()->back()->with('success', 'Device settings updated successfully');
        } catch (\Throwable $th) {
            //throw $th;
            $this->createActivityLog("Updated Device", "Failed to update device settings ", "web", "Error");
            return redirect()->back()->withErrors(['message' => "failure", "error" => $th->getMessage()]);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
