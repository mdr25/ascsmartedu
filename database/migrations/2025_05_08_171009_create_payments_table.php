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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->nullable()->constrained('classes')->onDelete('set null'); // pembayaran kelas
            // $table->foreignId('subscription_id')->nullable()->constrained('subscription_packages')->onDelete('set null'); // kalau masih mau support subscription
            $table->decimal('total_amount', 10, 2);
            $table->date('payment_date')->nullable();
            $table->enum('payment_method', ['Transfer', 'Qris', 'Virtual Account']);
            $table->string('payment_proof', 255)->nullable();
            $table->enum('status', ['paid', 'unpaid'])->default('unpaid');
            $table->timestamps();
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
