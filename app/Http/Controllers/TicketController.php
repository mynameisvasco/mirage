<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketRequest;
use App\Ticket;

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
            $tickets = Ticket::orderBy('status', 'asc')->with('user')->get();
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
        $ticket = Ticket::with('message')->with('message.user')->findOrFail($id);

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
            if($ticket->user_id != $id)
            {
                return response()->json(null, 401);
            }
        }

        $ticket->update($request->all());

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

        Ticket::destroy($id);

        return response()->json(null, 204);
    }
}