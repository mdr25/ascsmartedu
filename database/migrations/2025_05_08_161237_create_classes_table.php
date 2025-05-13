<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('class_name');
            $table->integer('total_student')->default(0);
            $table->unsignedBigInteger('jenjang_kelas_id');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('jenjang_kelas_id')->references('id')->on('jenjang_kelas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('classes');
    }
};
