<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticket;
use Carbon\Carbon;


class StatsController extends Controller
{
    //Returns the number of tickets and the number of the last 7 days
    public function ticketsNumByDay()
    {
        if(auth()->user()->isAdmin())
        {
            $tickets = Ticket::all();
        }
        //If it is a support only return the tickets that belong to him not all
        else if(auth()->user()->isSupport())
        {
            $tickets = Ticket::where('staff_id', auth()->user()->id)->get();
        }
        else
        {
            return response()->json(null, 401);
        }
        
        $ticketsLast7Days = ["total" => count($tickets)];

        for($i = 0; $i < 7; $i++)
        {
            $tickets = Ticket::whereDate('created_at', Carbon::today()->subDays($i))->get();
            $ticketsLast7Days["byDayNum"][$i] = count($tickets);
            $ticketsLast7Days["byDayLabel"][$i] =  Carbon::today()->subDays($i)->isoFormat('MMMM D, YYYY');
        }

        return response()->json($ticketsLast7Days, 200);
    }
}
