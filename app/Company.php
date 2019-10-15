<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = ['id'];

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function invoices()
    {
        return $this->hasMany('App\Invoice');
    }

    public function items()
    {
        return $this->hasMany('App\Item');
    }

    public function tickets()
    {
        return $this->hasMany('App\Ticket');
    }
    
}