<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrepositionResources extends Model
{
     protected $table = 'prepositioned_resources';
    protected $fillable = [
        'medical_public_health',
        'nutrition_emergency',
        'water_sanitation_hygiene',
        'mental_health_psychosocial_support',
    ];
}
