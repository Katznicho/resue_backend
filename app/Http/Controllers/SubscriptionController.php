<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        try {
             $user_id =  $request->user()->id;

              $user =  User::find($user_id);
            // Get the subscription data from the request
            $pushSubscription = $request->input('subscription_data');
            // Update the push subscription details for the user
            $user->updatePushSubscription($pushSubscription['endpoint'], $key=$pushSubscription['keys']['p256dh'], $token=$pushSubscription['keys']['auth'], $contentEncoding=null);
            return response()->json(['message' => 'success', 'data'=>"subscription registered successfully"], 200);
        } catch (\Throwable $th) {
            //throw $th;
             dd($th->getMessage());
             return response()->json(['message' => 'failure', 'data'=>"failed to register a subscription"], 404);

        }
    }
}
