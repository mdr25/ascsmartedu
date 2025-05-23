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
        Schema::create('materi', function (Blueprint $table) {
            $table->id();
            $table->string('nama_materi');
            $table->text('desc_materi');
            $table->unsignedBigInteger('bab_id');
            $table->string('file_path')->nullable(); // ✅ Tambahkan ini
            $table->timestamps();

            $table->foreign('bab_id')->references('id')->on('bab')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materi');
    }
};
