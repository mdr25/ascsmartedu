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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('total_amount', 10, 2);
            $table->date('payment_date');
            $table->enum('payment_method', ['Transfer', 'Qris', 'Virtual Account']);
            $table->string('payment_proof', 255);
            $table->enum('status', ['paid', 'unpaid']);
            $table->foreignId('users_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
