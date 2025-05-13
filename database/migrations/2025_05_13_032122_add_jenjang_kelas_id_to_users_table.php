<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('jenjang_kelas_id')->nullable()->after('email');
            $table->foreign('jenjang_kelas_id')
                  ->references('id')
                  ->on('jenjang_kelas')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['jenjang_kelas_id']);
            $table->dropColumn('jenjang_kelas_id');
        });
    }
};
