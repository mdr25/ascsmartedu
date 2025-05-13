<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('classes_has_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('classes_id')->constrained('classes')->onDelete('cascade');
            $table->foreignId('payments_id')->constrained('payments')->onDelete('cascade');
            $table->foreignId('payments_users_id')->constrained('users')->onDelete('cascade'); // Menambahkan referensi ke tabel 'users'
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classes_has_payments');
    }
};
