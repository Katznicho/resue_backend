<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up(): void
    {

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone_number')->nullable();
            $table->string('address')->nullable();
            $table->unsignedBigInteger('role_id')->default('1');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->boolean('is_phone_number_verified')->default(false);
            $table->string('title')->nullable();
            $table->boolean('is_suspended')->default(false);
            $table->integer('login_attempts')->default(0);
            $table->boolean("is_verified")->default(false);
            $table->string('email_token')->nullable();
            $table->dateTime('otp_send_time')->nullable();
            $table->string('otp')->nullable();
            $table->string('phone_number_token')->nullable();
            $table->string('password_reset_token')->nullable();
            $table->string("user_image")->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('role_id')->references('id')->on('roles');
            $table->foreignId('user_type_id')->constrained()->onDelete('cascade');

;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
}
