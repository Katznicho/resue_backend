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
        Schema::create('data', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type');
            $table->text('description')->nullable();
            $table->string('filename')->nullable();
            $table->string('filepath')->nullable();
            $table->integer('duration')->nullable();
            $table->integer('size')->nullable();
            $table->integer('frame_rate')->nullable();
            $table->string('encoding_format')->nullable();
            $table->string("label")->nullable();
            $table->integer('bit_rate')->nullable();
            $table->integer('upload_rate')->nullable();
            $table->unsignedBigInteger('baby_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('baby_id')->references('id')->on('babies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data');
    }
};
