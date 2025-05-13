<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->enum('status', ['hadir', 'alpa', 'izin', 'sakit']);
            $table->unsignedBigInteger('classes_id');
            $table->timestamps();

            $table->foreign('classes_id')
                ->references('id')
                ->on('classes')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
