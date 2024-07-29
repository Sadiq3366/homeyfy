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
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('listing_title');
            $table->text('description');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('listing_type');
            $table->integer('listing_bedrooms');
            $table->integer('guests');
            $table->integer('beds');
            $table->integer('baths');
            $table->integer('listing_rooms');
            $table->string('listing_size');
            $table->string('listing_size_unit');
            $table->string('affiliate_booking_link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
