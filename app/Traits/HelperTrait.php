<?php

namespace App\Traits;

use Illuminate\Support\Str;


trait HelperTrait
{

    //write your helper function that generates a random password , hash password and return it
    public function generateRandomPassword()
    {
        //generate a random password using laravel str_random helper
        $password = Str::random(10);
        return $password;

    }

    public function genereteDeviceSerialNumber()
    {
        $device_serial_number = Str::random(15);
        return $device_serial_number;
    }
}

