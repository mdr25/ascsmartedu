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
        Schema::create('classes_has_payments', function (Blueprint $table) {
            $table->foreignId('classes_id')->constrained('classes')->onDelete('cascade');
            $table->foreignId('payments_id')->constrained('payments')->onDelete('cascade');
            $table->foreignId('payments_users_id')->constrained('users')->onDelete('cascade');
            $table->primary(['classes_id', 'payments_id', 'payments_users_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes_has_payments');
    }
};
