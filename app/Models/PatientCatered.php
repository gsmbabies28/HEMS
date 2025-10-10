<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientCatered extends Model
{
    protected $table = 'patient_catered';
    protected $fillable = [
        'health_facility',
        'no_of_patients',
    ];
}
