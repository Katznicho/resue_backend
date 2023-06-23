<?php

use App\Http\Controllers\API\DataController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function () {
    // Client routes
    include __DIR__ . '/custom/client_routes.php';
});



Route::post("someRoute", [DataController::class, "someFunction"]);

Route::post("defaultUser",  function(Request $request){

    //store user image
    $file = $request->file('file');
    $size = $file->getSize();
    $originalName = $file->getClientOriginalName();
    $filename =    $file->getClientOriginalName();
    $path = $file->storeAs('public/user_images', $filename);
    return "Done Storing";
});


