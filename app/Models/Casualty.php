<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Casualty extends Model
{
    protected $table = 'casualties';

    protected $fillable = ['deaths', 'injured'];
    
}
