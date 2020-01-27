<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Crypt;

class Company extends Model
{   
    protected $encrypt = [
        'name',
        'phone',
        'address',
        'email',
        'number'
    ];

    protected $guarded = ['id'];

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->encrypt))
        {
            $value = Crypt::encrypt($value);
        }

        return parent::setAttribute($key, $value);
    }

    public function getAttribute($key)
    {
        if (in_array($key, $this->encrypt))
        {
            return Crypt::decrypt($this->attributes[$key]);
        }

        return parent::getAttribute($key);
    }

    public function attributesToArray()
    {
        $attributes = parent::attributesToArray();

        foreach ($attributes as $key => $value)
        {
            if (in_array($key, $this->encrypt))
            {
                $attributes[$key] = Crypt::decrypt($value);
            }
        }

        return $attributes;
    }

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