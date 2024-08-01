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
        Schema::table('listings', function (Blueprint $table) {
            $table->integer('base_price')->after('listing_type');
            $table->string('price_mode')->after('base_price');
            $table->boolean('is_instance')->after('price_mode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->dropColumn('base_price');
            $table->dropColumn('price_mode');
            $table->dropColumn('is_instance');
        });
    }
};
