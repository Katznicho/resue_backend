<?php


use App\Http\Controllers\API\PaymentCardController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('client')->group(function () {

    Route::prefix('auth')->group(function () {
        Route::post('register', [UserController::class, 'register']);
        Route::post('verifyEmail', [UserController::class, 'verifyEmail']);
        Route::post('resendOTP', [UserController::class, 'resendOTP']);
        Route::post('login', [UserController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('createUserProfile', [UserController::class, 'createUserProfile']);
            Route::post('updateUserProfile', [UserController::class, 'updateUserProfile']);
            Route::post('logout', [UserController::class, 'logout']);
            Route::post('changePassword', [UserController::class, 'changePassword']);
            Route::post('updateAvatar', [UserController::class, 'updateAvatar']);
        });
    });



    // Payment Card Routes
    Route::middleware('auth:sanctum')->prefix('payment-cards')->group(function () {
        Route::get('', [PaymentCardController::class, 'getPaymentCards']);
        Route::post('', [PaymentCardController::class, 'createPaymentCard']);
        Route::post('updatePaymentCard', [PaymentCardController::class, 'updatePaymentCard']);
        Route::post('deletePaymentCard', [PaymentCardController::class, 'deletePaymentCard']);
        Route::post('setDefaultPaymentCard', [PaymentCardController::class, 'setDefaultPaymentCard']);
    });
});
