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
        Schema::create('affected_displaced', function (Blueprint $table) {
            $table->id();
            $table->integer('barangay')->nullable();
            $table->integer('families')->nullable();
            $table->integer('individuals')->nullable();
            $table->timestamps();
        });
        Schema::create('casualties', function (Blueprint $table) {
            $table->id();
            $table->integer('deaths')->nullable();
            $table->integer('injured')->nullable();
            $table->timestamps();
        });
        Schema::create('deployed_human_resource', function (Blueprint $table) {
            $table->id();
            $table->integer('doctors')->nullable();
            $table->integer('nurses')->nullable();
            $table->integer('nursing_aid')->nullable();
            $table->integer('driver')->nullable();
            $table->integer('other')->nullable();
            $table->timestamps();
        });
        Schema::create('status_of_lifelines', function (Blueprint $table) {
            $table->id();
            $table->string('lgu')->nullable();
            $table->integer('electric_power')->nullable();
            $table->integer('water')->nullable();
            $table->integer('road_bridges')->nullable();
            $table->timestamps();
        });
        Schema::create('damaged_health_facilities', function (Blueprint $table) {
            $table->id();
            $table->string('facility_type')->nullable();
            $table->integer('total_number')->nullable();
            $table->integer('assessed')->nullable();
            $table->integer('damaged')->nullable();
            $table->integer('non_functional')->nullable();
            $table->timestamps();
        });
        Schema::create('health_cluster_teams_deployed', function (Blueprint $table) {
            $table->id();
            $table->integer('medical_public_health')->nullable();
            $table->integer('nutrition_emergencies')->nullable();
            $table->integer('water_sanitation_hygiene')->nullable();
            $table->integer('mental_health_psychosocial_support')->nullable();
            $table->timestamps();
        });
        Schema::create('medical_services_provided', function (Blueprint $table) {
            $table->id();
            $table->integer('medical_public_health')->nullable();
            $table->integer('nutrition_emergencies')->nullable();
            $table->integer('water_sanitation_hygiene')->nullable();
            $table->integer('mental_health_psychosocial_support')->nullable();
            $table->timestamps();
        });
        Schema::create('other_medical_services_provided', function (Blueprint $table) {
            $table->id();
            $table->string('blood_service_facility')->nullable();
            $table->integer('o_wb')->nullable();
            $table->integer('o_prbc')->nullable();
            $table->integer('a_wb')->nullable();
            $table->integer('a_prbc')->nullable();
            $table->integer('b_wb')->nullable();
            $table->integer('b_prbc')->nullable();
            $table->integer('ab_wb')->nullable();
            $table->integer('ab_prbc')->nullable();
            $table->timestamps();
        });

        Schema::create('mobilized_resources', function (Blueprint $table) {
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
        Schema::dropIfExists('affected_displaced');
        Schema::dropIfExists('casualties');
        Schema::dropIfExists('deployed_human_resource');
        Schema::dropIfExists('status_of_lifelines');
        Schema::dropIfExists('damaged_health_facilities');
        Schema::dropIfExists('health_cluster_teams_deployed');
        Schema::dropIfExists('medical_services_provided');
        Schema::dropIfExists('other_medical_services_provided');
        Schema::dropIfExists('mobilized_resources');
    }
};
