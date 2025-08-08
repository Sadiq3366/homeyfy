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
            $table->string('contact_info')->after('virtual_tour');
            $table->text('private_note')->after('contact_info');
            $table->string('is_feature')->after('private_note');
            $table->string('view_login')->after('is_feature');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->dropColumn(['contact_info', 'private_note', 'is_feature', 'view_login']);
        });
    }
};
