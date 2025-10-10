<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtherMedicalServicesProvided extends Model
{
    protected $table = 'other_medical_services_provided';
    protected $fillable = [
        'blood_service_facility',
        'no_of_blood_units',
        'recipient',
        'human_milk',
        'vaccines',
    ];
}
