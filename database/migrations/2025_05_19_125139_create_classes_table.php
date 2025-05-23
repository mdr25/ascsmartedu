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
            $table->unsignedBigInteger('pengajar_id')->nullable(); // kolom untuk pengajar, nullable
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('jenjang_kelas_id')
                ->references('id')
                ->on('jenjang_kelas')
                ->onDelete('cascade');

            $table->foreign('pengajar_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null'); // kalau pengajar dihapus, kelas tetap ada tapi pengajar_id null
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('classes', function (Blueprint $table) {
            $table->dropForeign(['jenjang_kelas_id']);
            $table->dropForeign(['pengajar_id']);
        });
        Schema::dropIfExists('classes');
    }
};
