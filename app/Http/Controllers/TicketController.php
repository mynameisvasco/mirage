<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Ticket;
use App\Stat;

class TicketController extends Controller
{
    public function index()
    {
        if(auth()->user()->isClient()) 
        {
            $tickets = Ticket::orderBy('status', 'desc')->with('staff')->where('user_id', auth()->user()->id)->get();
        }
        else if(auth()->user()->isSupport())
        {
            $tickets = Ticket::orderBy('status', 'asc')->where('staff_id', 0)->orWhere('staff_id', auth()->user()->id)->with('user')->get();
        }
        else if(auth()->user()->isAdmin())
        {
            $tickets = Ticket::orderBy('status', 'asc')->with('user.company')->get();
        }
        else
        {
            return response()->json(null, 401);
        }

        return response()->json($tickets);
    }

    public function store(TicketRequest $request)
    {
        $ticket = Ticket::create($request->all());

        return response()->json($ticket, 201);
    }

    public function show($id)
    {
        $ticket = Ticket::with('message.user')->with('user.company.items')->findOrFail($id);
        if(auth()->user()->isClient() || auth()->user()->isFinancial()) 
        {
            if($ticket->user_id != auth()->user()->id)
            {
                return response()->json(null, 401);
            }
        }

        return response()->json($ticket);
    }

    public function update(TicketRequest $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        if(auth()->user()->isClient() || auth()->user()->isFinancial()) 
        {
            if($ticket->user_id != auth()->user()->id)
            {
                return response()->json(null, 401);
            }
        }
        
        $ticket->update($request->all());
        
        //Check if Ticket was resolved, if yes increase resolved tickets stat for the staff_ID
        $stat = Stat::where('name', 'solvedTickets')->where('user_id', $ticket->staff_id)->first();

        if(!isset($stat))
        {
            $stat = new Stat();
            $stat->name = 'solvedTickets';
            $stat->value = 1;
            $stat->user_id = $ticket->staff_id;
            $stat->save();
        }
        else
        {
            $stat->value += 1;
            $stat->save();
        }

        return response()->json($ticket, 200);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        
        if(auth()->user()->isClient() || auth()->user()->isFinancial())
        {
            if($ticket->user_id != auth()->user()->id)
            {
                return response()->json(null, 401);
            }
        }

        foreach($ticket->message as $message)
        {
            $message->delete();
        }

        Ticket::destroy($id);

        return response()->json(null, 204);
    }

    public function getResolved($company_id)
    {
        $tickets = Ticket::where('company_id', $company_id)->where('status', 2)->get();

        return response()->json($tickets, 200);
    }
}