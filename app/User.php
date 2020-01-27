<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cache;
use Crypt;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;


    /**
     * Rank System
     * 0 - Client
     * 1 - Support (Tickets permissions and some invoices permissions)
     * 2 - Financial (Tickets permissions and full invoices permissions)
     * 3 - Administrator (Full permissions)
     */

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'email_hash', 'password', 'picture', 'rank', 'company_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    protected $encrypt = [
        'name',
        'email',
        'picture',
    ];

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

    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    public function isOnline()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    public function isClient()
    {
        if($this->rank == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function isSupport()
    {
        if($this->rank == 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function isFinancial()
    {
        if($this->rank == 2)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function isAdmin()
    {
        if($this->rank == 3)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public function findForPassport($email_hash) 
    {
        return $this->where('email_hash', $email_hash)->first();
    }
}
