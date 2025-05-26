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
        Schema::table('bab', function (Blueprint $table) {
            $table->unsignedInteger('order')->default(0)->after('nama_bab');
        });

        Schema::table('subbab', function (Blueprint $table) {
            $table->unsignedInteger('order')->default(0)->after('judul_subbab');
        });

        Schema::table('konten', function (Blueprint $table) {
            $table->unsignedInteger('order')->default(0)->after('judul_konten');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bab_subbab_konten_tables', function (Blueprint $table) {
            //
        });
    }
};
