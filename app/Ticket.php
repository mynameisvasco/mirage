<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $guarded = ['id'];

    public function messages()
    {
        return $this->hasMany('App\Message');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function staff()
    {
        return $this->belongsTo('App\User', 'staff_id');
    }

    public function company()
    {
        return $this->belongsTo('App\Company');
    }
}