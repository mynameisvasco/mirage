<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticket;
use Carbon\Carbon;
use App\Invoice;
use App\Stat;

class StatsController extends Controller
{
    public function index()
    {
        if(auth()->user()->isAdmin())
        {
            $stats = Stat::latest()->get();
        }
        else if(auth()->user()->isSupport())
        {
            $stats = Stat::latest()->where('user_id', auth()->user()->id)->get();
        }
        else
        {
            return response()->json(null,401);
        }

        $tickets = array('numTickets' => 0, 'solvedTickets' => 0, 'unsolvedTickets' => 0);
        $invoices = array('totalMoney' => 0, 'numInvoices' => 0, 'paidInvoices' => 0, 'unpaidInvoices' => 0, 'overdueInvoices' => 0);        
        foreach($stats as $stat)
        {
            //Ticket stats
            if($stat->name == "numTickets") $tickets['numTickets'] = $stat->value;
            if($stat->name == "solvedTickets") $tickets['solvedTickets'] = $stat->value;

            //Invoices Stats
            if($stat->name == "numInvoices") $invoices['numInvoices'] = $stat->value;
            if($stat->name == "paidInvoices") $invoices['paidInvoices'] = $stat->value;
            if($stat->name == "totalMoney") $invoices['totalMoney'] = $stat->value;
        }

        $invoices['unpaidInvoices'] = $invoices['numInvoices'] - $invoices['paidInvoices'];
        $tickets['unsolvedTickets'] = $tickets['numTickets'] - $tickets['solvedTickets'];
        
        $stats = array('tickets' => $tickets, 'invoices' => $invoices);

        return response()->json($stats, 200);
    }
}
