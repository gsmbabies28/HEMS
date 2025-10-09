<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AffectedPopulation extends Model
{
    protected $table = 'affected_displaced';
    protected $fillable = [
        'barangay',
        'families',
        'individuals',
    ];
}
