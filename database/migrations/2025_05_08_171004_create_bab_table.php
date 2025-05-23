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
        Schema::create('bab', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_mapel_id')->constrained('kelas_mapel')->onDelete('cascade');
            $table->string('nama_bab', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bab');
    }
};
