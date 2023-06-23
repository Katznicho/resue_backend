<?php

use App\Http\Controllers\API\DataController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Route;



Route::prefix("client")->group(function (){

    Route::resource('data', DataController::class);
    //get last video
    Route::get("/getLastVideo", [DataController::class, "getLastVideo"]);
    Route::get("/getLastAudio", [DataController::class, "getLastAudio"]);
    Route::post("/getUserDeviceDetails", [SettingController::class , "getUserDeviceDetails"]);
});
