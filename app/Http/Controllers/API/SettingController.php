<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    //

    public function getUserDeviceDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'device_id' => 'required|string|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        //get the user from the device id
        $device = Device::where('device_serial_number', $request->input('device_id'))
        ->with("user")
        ->with("sensors")
        ->first();
        $user =  $device->user;

        try {
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            $device_details = Device::where('user_id', $user->id)
                ->with('sensors')
                ->get();

            if ($device_details->count() > 0) {
                return response()->json(
                    [
                        'message' => 'success',
                        'data' => $device_details
                    ],
                    200
                );
            } else {
                return response()->json(
                    [

                        'message' => 'failure',
                        'data' => []
                    ],
                    200
                );
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(
                [
                    'message' => 'failure',
                    'data' => []
                ],
                404
            );
        }
    }
}
