<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeployedHRH extends Model
{
    protected $table = 'deployed_human_resource';
    protected $fillable = [
        'doctors',
        'nurses',
        'nursing_aid',
        'driver',
        'other'
    ];
}
