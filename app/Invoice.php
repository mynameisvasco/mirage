<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $guarded = ['id'];

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function ticket()
    {
        return $this->belongsTo('App\Ticket');
    }
}