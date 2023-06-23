<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\EmailUserVerification;
use App\Models\User;
use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\HasApiTokens;


class UserController extends Controller
{
    use HasApiTokens, LogTrait;

    //
    // Register a new user
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'phone_number' => 'required|string|unique:users',
            'password' => 'required|string',

        ]);

        // Generate a random OTP code
        // $otpCode = 123456;
        $otpCode = random_int(100000, 999999);

        // Create a new user
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'otp' => Hash::make($otpCode),
            'otp_send_time' => now(),
            'password' => Hash::make($request->password),
            'role_id' => 1
        ]);

        // Create an auth token for the user
        $authToken = $user->createToken('authToken')->plainTextToken;


        try {
            // Send the OTP code to the user's email
            Mail::to($user->email)->send(new EmailUserVerification($otpCode, $user, 'user'));
        } catch (\Throwable $th) {
            // throw $th;
            var_dump($th->getMessage());
            die("here");
            return response()->json([
                'response' => 'failure',
                'message' => 'Failed to send OTP code to email. Try again later'
            ], 500);
        }

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully created user!',
            'user' => $user,
            'authToken' => $authToken
        ], 201);
    }


    //
    // Verify a user's email
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|exists:users,email',
            'otp' => 'required|size:6'
        ]);

        // Find the user
        $user = User::where('email', $request->email)->first();

        // Check if the OTP code is correct
        if (!Hash::check($request->otp, $user->otp)) {
            return response()->json([
                'response' => 'failure',
                'message' => 'Incorrect OTP. Check your email for OTP sent to you'
            ], 401);
        }

        // Check if the OTP code is expired
        if (now()->diffInMinutes($user->otp_send_time) > 5) {
            return response()->json([
                'response' => 'failure',
                'message' => 'OTP code expired'
            ], 401);
        }

        // Update the user's email verification status
        $user->update([
            'otp' => null,
            'otp_send_time' => null,
            'is_verified' => true,
            'verified_at' => now(),
        ]);
        $this->createActivityLog("RegisterUser", "User registered successfully", "app", "Informational");

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully verified email!',
            'user' => $user
        ], 200);
    }


    //
    // Resend OTP in case user didn't receive or it expired
    public function resendOTP(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|exists:users,email',
        ]);

        // Generate a random OTP code
        $otpCode = random_int(100000, 999999);

        // Get the user
        $user = User::where('email', $request->email)->first();

        // Update the user's OTP code and OTP send time
        $user->update([
            'otp' => Hash::make($otpCode),
            'otp_send_time' => now(),
        ]);

        try {
            // Send the OTP code to the user's email
            Mail::to($user->email)->send(new EmailUserVerification($otpCode, $user, 'user'));
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->json([
            'response' => 'success',
            'message' => 'OTP resent successfully',
        ], 201);
    }


    //
    // Login a user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // Find the user
        $user = User::where('email', $request->email)->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'response' => 'failure',
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Create an auth token for the user
        $authToken = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully logged in!',
            'user' => $user,
            'authToken' => $authToken
        ], 200);
    }


    //
    // Logout a user
    public function logout(Request $request)
    {
        // Delete the user's current auth token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully logged out!'
        ], 200);
    }


    //
    // Change a user's password
    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string',
            'new_password' => 'required|string'
        ]);

        // Find the user
        $user = User::where('email', $request->user()->email)->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'response' => 'failure',
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Check if the new password is the same as the old password
        if ($request->old_password == $request->new_password) {
            return response()->json([
                'response' => 'failure',
                'message' => 'New password cannot be the same as the old password'
            ], 401);
        }

        // Change the user's password
        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully changed password!'
        ], 200);
    }


    //
    // Update user avatar
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required',
        ]);

        // Find the user
        $user = User::where('id', $request->user()->id)->first();

        // Check if the user exists
        if (!$user) {
            return response()->json([
                'response' => 'failure',
                'message' => 'User does not exist'
            ], 401);
        }

        // Update the user's avatar
        $user->avatar = $request->avatar;
        $user->save();

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully updated avatar!',
            'user' => $user
        ], 200);
    }


    //
    // Save user profile
    public function createUserProfile(Request $request)
    {
        $request->validate([
            'gender' => 'required|string',
            'age' => 'required|integer',
            'weight' => 'required|integer',
            'height' => 'required|integer',
            'goal' => 'required|string',
            'physical_activity_level' => 'required|string',
        ]);

        // Check if the user already has a profile, if so, return an failure response
        $profileCheck = UserProfile::where('user_id', $request->user()->id)->first();
        if ($profileCheck) {
            return response()->json([
                'response' => 'failure',
                'message' => 'User profile already exists'
            ], 400);
        }

        // Create a new user profile
        $profile = UserProfile::create([
            'user_id' => auth()->user()->id,
            'gender' => $request->gender,
            'age' => $request->age,
            'weight' => $request->weight,
            'height' => $request->height,
            'goal' => $request->goal,
            'physical_activity_level' => $request->physical_activity_level,
        ]);

        return response()->json([
            'response' => 'success',
            'message' => 'Successfully created user profile!',
            'profile' => $profile
        ], 201);
    }


    //
    // Update user profile
    public function updateUserProfile(Request $request)
    {
        $request->validate([
            'gender' => 'required|string',
            'age' => 'required|integer',
            'weight' => 'required|integer',
            'height' => 'required|integer',
            'goal' => 'required|string',
            'physical_activity_level' => 'required|string',
        ]);

        // Find the user profile
        $profile = UserProfile::where('user_id', $request->user()->id)->first();

        // Check if the user profile exists
        if (!$profile) {
            return response()->json([
                'response' => 'failure',
                'message' => 'User profile does not exist'
            ], 401);
        }

        // Update the user profile
        $profile->update([
            'gender' => $request->gender,
            'age' => $request->age,
            'weight' => $request->weight,
            'height' => $request->height,
            'goal' => $request->goal,
            'physical_activity_level' => $request->physical_activity_level,
        ]);

        return response()->json([
            'response' => 'success',
            'message' => 'User profile updated!',
            'profile' => $profile
        ], 201);
    }
}
