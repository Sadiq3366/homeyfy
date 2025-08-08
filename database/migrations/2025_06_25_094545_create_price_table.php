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
        Schema::create('price', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');
            $table->string('price_postfix');
            $table->integer('weekends_price');
            $table->string('weekends_days');
            $table->integer('priceWeek');
            $table->integer('priceMonthly');
            $table->string('allow_additional_guests');
            $table->integer('additional_guests_price');
            $table->integer('num_additional_guests');
            $table->integer('cleaning_fee');
            $table->string('cleaning_fee_type');
            $table->integer('city_fee');
            $table->string('city_fee_type');
            $table->integer('security_deposit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price');
    }
};
