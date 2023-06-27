<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table ->foreignId('user_id')->constrained()->onDelete('cascade');
            $table ->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->string('quantity')->nullable();
            $table->string('price')->nullable();
            $table->string('discount')->nullable();
            $table->string('discount_type')->nullable();
            $table->string("status")->default("pending");
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
