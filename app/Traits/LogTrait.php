<?php

namespace App\Traits;

use App\Models\Logs;


trait LogTrait
{
    public function createActivityLog($action, $description, $platform = "web", $status, $error=null)
    {
        Logs::create([
            'name' => request()->user() ? request()->user()->name : null,
            'ip_address' => request()->ip(),
            'method' => request()->method(),
            'action'=>$action,
            'path' => request()->fullUrl(),
            'message' => $description,
            'platform' => $platform,
            'severity' => $status,
            'error_code' => $error,
            'user_id' => request()->user() ? request()->user()->id : null,
        ]);
    }
}

