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
        Schema::create('prepositioned_resources', function (Blueprint $table) {
            $table->id();
            $table->double('medical_public_health')->nullable();
            $table->double('nutrition_emergency')->nullable();
            $table->double('water_sanitation_hygiene')->nullable();
            $table->double('mental_health_psychosocial_support')->nullable();
            $table->timestamps();
        });
        Schema::create('available_resources', function (Blueprint $table) {
            $table->id();
            $table->double('medical_public_health')->nullable();
            $table->double('nutrition_emergency')->nullable();
            $table->double('water_sanitation_hygiene')->nullable();
            $table->double('mental_health_psychosocial_support')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prepostioned_resources');
        Schema::dropIfExists('available_resources');
    }
};
