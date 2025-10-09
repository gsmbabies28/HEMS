<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('other_medical_services_provided', function (Blueprint $table) {
            // Drop old columns (if you’re replacing them)
            $table->dropColumn([
                'o_wb', 'o_prbc',
                'a_wb', 'a_prbc',
                'b_wb', 'b_prbc',
                'ab_wb', 'ab_prbc',
            ]);

            // Add new columns
            $table->integer('no_of_blood_units')->nullable();
            $table->string('recipient')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('other_medical_services_provided', function (Blueprint $table) {
            // Rollback changes
            $table->dropColumn(['no_of_blood_units', 'recipient']);

            // Recreate old columns
            $table->integer('o_wb')->nullable();
            $table->integer('o_prbc')->nullable();
            $table->integer('a_wb')->nullable();
            $table->integer('a_prbc')->nullable();
            $table->integer('b_wb')->nullable();
            $table->integer('b_prbc')->nullable();
            $table->integer('ab_wb')->nullable();
            $table->integer('ab_prbc')->nullable();
        });
    }
};