<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bank_soal', function (Blueprint $table) {
            $table->id();
            $table->string('nama_materi', 255);
            $table->text('soal');
            $table->string('materi');
            $table->enum('level', ['easy', 'medium', 'hard']);
            $table->unsignedBigInteger('classes_id');
            $table->timestamps();

            // Foreign Key Constraint
            $table->foreign('classes_id')
                  ->references('id')
                  ->on('classes')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_soal');
    }
};
