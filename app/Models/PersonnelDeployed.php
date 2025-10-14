<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonnelDeployed extends Model
{
    protected $table = 'personnel_deployed';
    
    protected $fillable = [
        'full_name',
        'position',
        'assigned_facility',
        'deployment_start_date',
        'health_cluster_team_id',
    ];
}
