<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Traits\LogTrait;

class LogController extends Controller
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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // 'name',
        // 'user_id',
        // 'ip_address',
        // 'severity',
        // 'message',
        // 'error_code',
        // 'platform',
        // 'action',
        // 'method',
        // 'path'
        $logs = Logs::when(!$this->isAdmin, function ($query) use ($request) {
            return $query->where('user_id', $request->user()->id);
        })
        ->with('user')
        ->get()
        ->map(function ($log) {
            return [
                'id' => $log->id,
                'ip_address' => $log->ip_address,
                'severity' => $log->severity,
                'user' => $log->user,
                'message' => $log->message,
                'platform' => $log->platform,
                'action' => $log->action,
                'path'=>$log->path,
                'method' => $log->method,
                'created_at' => $log->created_at,
                'updated_at' => $log->updated_at
            ];
        });

    // Return the babies to the 'Baby/Index' Inertia view
    return Inertia::render('Log/Index', ['logs' => $logs]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function show(Logs $logs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function edit(Logs $logs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Logs $logs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Logs  $logs
     * @return \Illuminate\Http\Response
     */
    public function destroy(Logs $logs)
    {
        //
    }
}
