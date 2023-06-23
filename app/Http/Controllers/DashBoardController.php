<?php

namespace App\Http\Controllers;

use App\Models\Baby;
use App\Models\Data;
use App\Models\Device;
use App\Models\Sensor;
use App\Models\User;
use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashBoardController extends Controller
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

    public function index(Request $request)
    {
        $user_id = $request->user()->id;
        $baby_id  = $request->user()->baby->id ?? '';
        $vidoe_url = null;

        $device = Device::where('user_id', $request->user()->id)
            ->with('user')
            ->with('sensors')
            ->get();
            //dd($device[0]->id);

         $lastest_video =  Data::where([
             ['baby_id', $baby_id],
             ['type', '=', 'video']
         ])->orderBy('created_at', 'desc')->first();

         if($lastest_video){
           $vidoe_url = url(str_replace('public', '/storage', $lastest_video->filepath));
         }
         else{
            $vidoe_url =  "https://youtu.be/M2-tSFg7hfg";
         }



        if ($this->isAdmin) {
            $total_users =  User::count();
            $total_babies =  Baby::count();
            $total_admins =  User::where('role_id', 1)->count();
            $total_parents =  User::where('role_id', 2)->count();
            $total_devices =  Device::count();
            $total_sensor =   Sensor::count();
            return Inertia::render('Dashboard', [

                "totals" => [
                    'total_users' => $total_users,
                    'total_babies' => $total_babies,
                    'total_admins' => $total_admins,
                    'total_parents' => $total_parents,
                    'total_devices' => $total_devices,
                    'total_sensors' => $total_sensor,
                    'video_url'=>$vidoe_url,
                    'device'=>$device
                ],

            ]);
        } else {
            $total_users =  User::where('id', $user_id)->count();
            $total_babies =  Baby::where('user_id', $user_id)->count();
            $total_admins =  User::where('role_id', 1)->count();
            $total_parents =  User::where('role_id', 2)->count();
            $total_devices =  Device::where('user_id', $user_id)->count();
            $total_sensor =   Sensor::where('user_id', $user_id)->count();

            return Inertia::render('Dashboard', [
                "totals" => [
                    'total_users' => $total_users,
                    'total_babies' => $total_babies,
                    'total_admins' => $total_admins,
                    'total_parents' => $total_parents,
                    'total_devices' => $total_devices,
                    'total_sensors' => $total_sensor,
                    'video_url'=>$vidoe_url,
                    'device'=>$device
                ],


            ]);
        }
    }
}
