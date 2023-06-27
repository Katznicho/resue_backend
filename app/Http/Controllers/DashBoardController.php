<?php

namespace App\Http\Controllers;

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





        if ($this->isAdmin) {
            $total_users =  User::count();

            return Inertia::render('Dashboard', [

                "totals" => [
                    'total_users' => $total_users,

                ],

            ]);
        } else {
            $total_users =  User::where('id', $user_id)->count();


            return Inertia::render('Dashboard', [
                "totals" => [
                    'total_users' => $total_users,
                ],


            ]);
        }
    }
}
