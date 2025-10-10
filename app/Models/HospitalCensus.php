<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HospitalCensus extends Model
{
    protected $table = 'hospital_census';
    protected $fillable = [
        'hospital_name',
        'under_10',
        'age_10_20',
        'age_21_59',
        'age_60_above',
        'male',
        'female',
        'admitted',
        'discharged',
        'died',
        'operated',
    ];
}
