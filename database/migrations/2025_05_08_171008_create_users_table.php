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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->string('email', 45)->unique();
            $table->string('password', 255);
            $table->string('phone_number', 45);
            $table->enum('gender', ['M', 'F']);
            $table->string('address', 255);
            $table->foreignId('roles_id')->constrained('roles')->onDelete('cascade');
            $table->foreignId('classes_id')->nullable()->constrained('classes')->onDelete('set null');
            $table->foreignId('subscription_id')->nullable()->constrained('subscription_packages')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
