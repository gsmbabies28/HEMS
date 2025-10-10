<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('hospital_census', function (Blueprint $table) {
            // Change columns to integer (nullable or default as needed)
            $table->integer('male')->default(0)->change();
            $table->integer('female')->default(0)->change();
        });
    }

    public function down(): void
    {
        Schema::table('hospital_census', function (Blueprint $table) {
            // Revert back to string type
            $table->string('male')->change();
            $table->string('female')->change();
        });
    }
};
