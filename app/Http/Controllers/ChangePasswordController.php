<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\PasswordChange;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Traits\LogTrait;


class ChangePasswordController extends Controller
{
    use LogTrait;

    public function showchangePassword()
    {
        // Assuming a view template engine like Blade is used for rendering views
        return Inertia::render('Auth/ChangePassword',);
    }

    public function updatePassword(Request $request)
    {

        try {
            $validaor = $request->validate([
                'old_password' => 'required',
                'new_password' => 'required'
            ]);


            //check if the current password matches with the password in the database
            if (!Hash::check($request->old_password, $request->user()->password)) {
                $this->createActivityLog("Password Change", 'Password change failed', 'web', 'High', 404);

                return redirect()->back()->withErrors([
                    'message' => "failure",
                    'data' => "The password does not match the one in the database"
                ]);
            } else {
                //update the password
                User::where('id', $request->user()->id)->update(['password' => Hash::make($request->new_password)]);
                //send a notification
                $user_to_notify = User::find($request->user()->id);
                $names = $user_to_notify->title . " " . $user_to_notify->name;
                $user_to_notify->notify(new PasswordChange($names, "Password Change",  "high"));
                // $user_to_notify->notify(new DataUpload($names, $request->input('type'), $path, $request->input('title'), 'high'));
                //send notification
                $this->createActivityLog("Password Change", 'Password change successful', 'web', 'Informational', 200);
                return redirect()->back()->with('success', 'Password changed successfully');
            }
        } catch (\Throwable $th) {

            return redirect()->back()->withErrors([
                'message' => "failure",
                'data' => "The password does not match the one in the database"
            ]);
        }
    }


    public function uploadProfileImage(Request $request)
    {
        $request->validate(['avatar' => 'required']);

        $user_id =  $request->user()->id;
        //store user image
        $file = $request->file('avatar');
        $filename =    Str::random(10)."". $file->getClientOriginalName();
        $path = $file->storeAs('public/user_images', $filename);
        $path_url =  url(str_replace('public', '/storage', $path));
        //update  user profile
        User::where("id", $user_id)->update(['user_image'=>$path_url]);
        return redirect()->back()->with("success", "profile updated sucessfully");
    }
}

