<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct()
    {

    }

    public function showProfile(Request $request)
    {
         $user_id =  $request->user()->id;
         $user_details = User::where("id", $user_id)
           ->first();
        // Assuming a view template engine like Blade is used for rendering views
        return Inertia::render('Auth/Profile', [
            'user'=>$user_details]);
    }

}
