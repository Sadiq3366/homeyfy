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
        Schema::table('price', function (Blueprint $table) {
            $table->string('price_postfix')->nullable()->change();
            $table->integer('weekends_price')->nullable()->change();
            $table->string('weekends_days')->nullable()->change();
            $table->integer('priceWeek')->nullable()->change();
            $table->integer('priceMonthly')->nullable()->change();
            $table->string('allow_additional_guests')->nullable()->change();
            $table->integer('additional_guests_price')->nullable()->change();
            $table->integer('num_additional_guests')->nullable()->change();
            $table->integer('cleaning_fee')->nullable()->change();
            $table->string('cleaning_fee_type')->nullable()->change();
            $table->integer('city_fee')->nullable()->change();
            $table->string('city_fee_type')->nullable()->change();
            $table->integer('security_deposit')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('price', function (Blueprint $table) {
            $table->dropColumn([
                'price_postfix',
                'weekends_price',
                'weekends_days',
                'priceWeek',
                'priceMonthly',
                'allow_additional_guests',
                'additional_guests_price',
                'num_additional_guests',
                'cleaning_fee',
                'cleaning_fee_type',
                'city_fee',
                'city_fee_type',
                'security_deposit'
            ]);
        });
    }

};
