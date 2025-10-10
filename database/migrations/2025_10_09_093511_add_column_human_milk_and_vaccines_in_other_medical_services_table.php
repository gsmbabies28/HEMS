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
        Schema::table('other_medical_services_provided', function (Blueprint $table) {
            $table->integer('human_milk')->default(0);
            $table->integer('vaccines')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('other_medical_services_provided', function (Blueprint $table) {
            $table->dropColumn(['human_milk', 'vaccines']);
        });
    }
};
