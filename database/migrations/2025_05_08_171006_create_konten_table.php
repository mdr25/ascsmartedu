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
        Schema::create('konten', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bab_id')->nullable()->constrained('bab')->onDelete('cascade');
            $table->foreignId('subbab_id')->nullable()->constrained('subbab')->onDelete('cascade');
            $table->string('judul_konten');
            $table->enum('tipe_konten', ['video', 'pdf', 'link']);
            $table->text('konten_url'); // simpan link ke video/pdf/whatever
            $table->string('durasi', 10); // Contoh: "2min"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konten');
    }
};
