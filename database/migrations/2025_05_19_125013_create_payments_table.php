<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('users_id');
            $table->unsignedBigInteger('price_id'); 
            $table->date('payment_date');           
            $table->date('expired_at')->nullable();
            $table->enum('payment_method', ['Transfer', 'Qris', 'Virtual Account']);
            $table->string('payment_proof');
            $table->enum('status', ['paid', 'unpaid']);
            $table->timestamps();

            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('price_id')->references('id')->on('prices')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
