<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Crypt;

class Ticket extends Model
{
    protected $encrypt = [
        'title'
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