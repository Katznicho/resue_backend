<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use App\Traits\LogTrait;

class EmailVerificationNotificationController extends Controller
{
    use LogTrait;
    /**
     * Send a new email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        $request->user()->sendEmailVerificationNotification();


        $this->createActivityLog("EmailVerification", "Email verified successfully", "web", "Informational");
        return back()->with('status', 'verification-link-sent');
    }
}
