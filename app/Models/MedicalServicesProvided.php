<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalServicesProvided extends Model
{
    protected $table = 'medical_services_provided';
    protected $fillable = [
        'medical_public_health',
        'nutrition_emergencies',
        'water_sanitation_hygiene',
        'mental_health_psychosocial_support',
    ];
}
