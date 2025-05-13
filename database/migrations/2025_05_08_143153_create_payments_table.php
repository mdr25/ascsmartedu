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
        $table->unsignedBigInteger('users_id');
        $table->decimal('total_amount', 12, 2);
        $table->date('payment_date');
        $table->enum('payment_method', ['Transfer', 'Qris', 'Virtual Account']);
        $table->string('payment_proof');
        $table->enum('status', ['paid', 'unpaid']);
        $table->timestamps();

        $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
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
