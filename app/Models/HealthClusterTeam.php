<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthClusterTeam extends Model
{
    protected $table = 'health_cluster_teams_deployed';

    protected $fillable = [
        'medical_public_health',
        'nutrition_emergencies',
        'water_sanitation_hygiene',
        'mental_health_psychosocial_support',
    ];

}
