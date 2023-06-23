<?php

namespace App\Http\Controllers;

use App\Traits\LogTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartController extends Controller
{
    use LogTrait;
    private $isAdmin = false;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
             $role_name = $request->user()->role->name;
                if($role_name == config("constants.ADMIN")){
                    $this->isAdmin = true;
                }
                else{
                        $this->isAdmin = false;
                }
             return $next($request);
        });
    }


    public function index(Request $request){
      return Inertia::render('Dashboard',[
          'doughut'=>[
             'data'=>[12,5,5,8]
          ]
      ]);
    }

}
