<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cache;

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
        'name', 'email', 'password', 'picture', 'rank'
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
}
