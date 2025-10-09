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
        Schema::create('hospital_census', function (Blueprint $table) {
            $table->id();
            $table->string('hospital_name');
            $table->integer('under_10')->nullable();
            $table->integer('age_10_20')->default(0);
            $table->integer('age_21_59')->default(0);
            $table->integer('age_60_above')->default(0);
            $table->string('male');
            $table->string('female');
            $table->integer('admitted')->default(0);
            $table->integer('discharged')->default(0);
            $table->integer('died')->default(0);
            $table->integer('operated')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospital_census');
    }
};
