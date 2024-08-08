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
            $table->text('cancellation_policy');
            $table->integer('min_book_hours');
            $table->integer('min_book_weeks');
            $table->integer('max_book_weeks');
            $table->integer('min_book_months');
            $table->integer('max_book_months');
            $table->integer('min_book_days');
            $table->integer('max_book_days');
            $table->text('start_hour');
            $table->text('end_hour');
            $table->text('checkin_after');
            $table->text('checkout_before');
            $table->integer('smoke');
            $table->integer('pets');
            $table->integer('party');
            $table->integer('children');
            $table->text('additional_rules');
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
