<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Data;
use App\Models\Device;
use App\Models\User;
use App\Notifications\DataUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class DataController extends Controller
{
    private $user;

    public function __construct(Request $request)
    {
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

        try {
            //$user = $request->user();

            $validator = Validator::make($request->all(), [
                //'file' => 'required|file|mimetypes:video/avi,video/mpeg,video/quicktime|max:20000',
                'file' => 'required|file',
                'type' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:255',
                'device_id' => 'required|string|max:255',
                 'label'=>'required|string|max:255'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            //get the user from the device id
            $device = Device::where('device_serial_number', $request->input('device_id'))->with("user")->first();
            $user =  $device->user;
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }

            $file = $request->file('file');
            $size = $file->getSize();
            $originalName = $file->getClientOriginalName();
            $filename =  Str::random(10) . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/data', $filename);
            $video = new Data();
            $video->title = $request->input('title');
            $video->description = $request->input('description');
            $video->filename = $filename;
            $video->filepath = $path;
            $video->type = $request->input('type');
            $video->size = $size;
            $video->baby_id = $user->baby->id ?? null;
            $video->label = $request->label;
            $video->save();

            //send a notification
            $user_to_notify = User::find($user->id);
            $names = $user_to_notify->title . " " . $user_to_notify->name;
            $path = url(str_replace('public', '/storage', $video->filepath));
            $user_to_notify->notify(new DataUpload($names, $request->input('type'), $path, $request->input('title'), 'high'));
            //send notification

            return response()->json([
                'message' => 'Data stored successfully',
                'size' => $size,
                'original_name' => $originalName
            ], 200);
        } catch (\Throwable $th) {
            // Handle any exceptions that occurred during the file upload
            return $th;
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function getLastVideo(Request $request)
    {

        try {

            //get last video of the baby sent by the user in thr request by using the user id
            $device = Device::where('device_serial_number', $request->input('device_id'))->with("user")->first();
            $user =  $device->user;
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }
            $user  = User::where('id', $user->id)->with('baby')->first();
            $video = Data::where('baby_id', $user->baby->id)
                ->where("type", "video")
                ->orderBy('updated_at', 'desc')->first();
            if ($video) {
                return response()->json([
                    'message' => 'success',
                    'data' => [
                        'id' => $video->id,
                        'title' => $video->title,
                        'description' => $video->description,
                        'filename' => $video->filename,
                        'filepath' => $video->filepath,
                        'url' => url(str_replace('public', '/storage', $video->filepath)),
                        'type' => $video->type,
                        'size' => $video->size,
                        'baby_id' => $video->baby_id,
                        'created_at' => $video->created_at,
                        'updated_at' => $video->updated_at,
                    ]
                ], 200);
            } else {
                return response()->json([
                    'message' => 'failure',
                    'data' => []
                ], 200);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'failure',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    //get last audio
    public function getLastAudio(Request $request)
    {
        try {
            //get last video of the baby sent by the user in thr request by using the user id
            $device = Device::where('device_serial_number', $request->input('device_id'))->with("user")->first();
            $user =  $device->user;
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }
            $user  = User::where('id', $user->id)->with('baby')->first();
            $audio = Data::where('baby_id', $user->baby->id)
                ->where("type", "audio")
                ->orderBy('updated_at', 'desc')->first();
            if ($audio) {
                return response()->json([
                    'message' => 'success',
                    'data' => [
                        'id' => $audio->id,
                        'title' => $audio->title,
                        'description' => $audio->description,
                        'filename' => $audio->filename,
                        'filepath' => $audio->filepath,
                        'url' => url(str_replace('public', '/storage', $audio->filepath)),
                        'type' => $audio->type,
                        'size' => $audio->size,
                        'baby_id' => $audio->baby_id,
                        'created_at' => $audio->created_at,
                        'updated_at' => $audio->updated_at,
                    ]
                ], 200);
            } else {
                return response()->json([
                    'message' => 'failure',
                    'data' => []
                ], 200);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'failure',
                'error' => $th->getMessage()
            ], 500);
        }
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

    public function someFunction(Request $request)
    {
        //
    }
}
