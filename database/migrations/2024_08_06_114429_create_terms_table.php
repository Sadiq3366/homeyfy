<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('terms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');
            $table->text('cancellation_policy')->nullable();
            $table->integer('min_book_hours')->nullable();
            $table->integer('min_book_weeks')->nullable();
            $table->integer('max_book_weeks')->nullable();
            $table->integer('min_book_months')->nullable();
            $table->integer('max_book_months')->nullable();
            $table->integer('min_book_days')->nullable();
            $table->integer('max_book_days')->nullable();
            $table->text('start_hour')->nullable();
            $table->text('end_hour')->nullable();
            $table->text('checkin_after')->nullable();
            $table->text('checkout_before')->nullable();
            $table->integer('smoke')->nullable();
            $table->integer('pets')->nullable();
            $table->integer('party')->nullable();
            $table->integer('children')->nullable();
            $table->text('additional_rules')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('terms');
    }
};
