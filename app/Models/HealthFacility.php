<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthFacility extends Model
{
    protected $table = 'damaged_health_facilities';

    protected $fillable = [
        'facility_type',
        'total_number',
        'assessed',
        'damaged',
        'non_functional',
    ];
    
}
