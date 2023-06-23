<?php

use App\Http\Controllers\AudioController;
use App\Http\Controllers\BabyController;
use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ChartController;
use Illuminate\Support\Facades\Auth;use App\Http\Controllers\DasbboardController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', static function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        //
    ]);
});
//home page redirect to Home
Route::get('/home', static function () {
    Route::get('/home', static function () {
        // Check if the user is logged in
        if (Auth::check()) {
            // Redirect to the dashboard
            return redirect('/dashboard');
        } else {
            // Redirect to the home page
            return redirect('/login');
        }
    });

});

//redirect the user to login page if they are on index page or home page

Route::get('/', static function () {
    // Check if the user is logged in
    if (Auth::check()) {
        // Redirect to the dashboard
        return redirect('/dashboard');
    } else {
        // Redirect to the home page
        return redirect('/login');
    }
});

Route::group(['middleware'=>['auth', 'verified']], static function() {

    //rendering react components this is just an example
    Route::get('dashboard', [DashBoardController::class, "Index"])->name("dashboard");
    Route::resource('users', UserController::class);

    Route::resource("roles", RoleController::class);

    Route::resource('babies', BabyController::class);
    Route::resource('settings', SettingController::class);
    Route::resource("videos",  VideoController::class);
    Route::resource("audios",  AudioController::class);
    Route::resource("sensors", SensorController::class);
    Route::resource("logs", LogController::class);
    Route::resource("events", EventController::class);
    Route::resource("configurations", ConfigurationController::class);
    Route::resource("notifications", NotificationController::class);
    //
    //Route::get("/showprofile" , [ , 'showpt/'])
    Route::get("profile", [ProfileController::class , "showProfile"])->name('profile');
    //Route::post()

    Route::get("changePassword", [ChangePasswordController::class , "showchangePassword"])->name('changePassword');
    Route::post("updatePassword", [ChangePasswordController::class , "updatePassword"])->name('updatePassword');
    Route::post("uploadProfileImage", [ChangePasswordController::class , "uploadProfileImage"])->name("uploadProfileImage");

    Route::resource("settings", SettingController::class);
    Route::resource("sensors", SensorController::class);
    Route::resource("devices", DeviceController::class);
    
    Route::post("updateDeviceConfig", [DeviceController::class, "updateDeviceConfig"])->name("updateDeviceConfig");

    Route::get("device_details/{id}", [DeviceController::class, 'show'])->name("device_details");

    Route::post("markNotificationAsRead/{id}", [NotificationController::class , "markNotificationAsRead"])->name("markNotificationAsRead");

    Route::get("getUnreadNotifications", [NotificationController::class , "getUnreadNotifications"])->name("getUnreadNotifications");

    Route::get("getReadNotifications", [NotificationController::class , "getReadNotifications"])->name("getReadNotifications");

    Route::post('/subscribe', [SubscriptionController::class, 'store'])->name("subscribe");

    //settings
    Route::post("updateNotifications", [SettingController::class, "updateNotifications"])->name("updateNotifications");
    Route::post("updateDevice", [SettingController::class , "updateDevice"])->name("updateDevice");
    Route::post("updateSecurity", [SettingController::class , "updateSecurity"])->name("updateSecurity");

    //charts
    Route::get("/doughnut", [ChartController::class, 'index'])->name("doughnut");





    //not found page
    Route::get('/404', static function () {
        return Inertia::render('NotFound/Index');
    })->name('404');



});
require __DIR__.'/auth.php';
