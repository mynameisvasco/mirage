<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Message;
use App\Ticket;
use App\Stat;
use App\User;
use App\Notifications\NewTicket;
Use App\Notifications\NewMessageClient;
Use App\Notifications\NewMessageSupport;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::latest()->with('user')->with('staff')->with('ticket')->get();

        return response()->json($messages);
    }

    public function store(MessageRequest $request)
    {
        $request->validate([
            'body' => 'required',
        ]);

        //Check if the message belongs to existing ticket or not
        $ticket = Ticket::find($request->ticket_id);
        //If not create the ticket
        if(!isset($ticket))
        {
            $ticket = new Ticket();
            $ticket->title = $request->title;
            $ticket->user_id = $request->user_id; //This is always the user_id of the client assigned to that ticket
            $ticket->staff_id = $request->staff_id; //This is always the user_id of the staff assigned to that ticket
            $ticket->status = 0;
            $ticket->company_id = User::find($request->user_id)->company_id;
            $ticket->save();

            //Create the message
            $message = new Message();
            $message->body = $request->body;
            $message->user_id = auth()->user()->id;
            $message->ticket_id = $ticket->id;
            $message->save();

            //If it is not a client update worker stats
            if(!auth()->user()->isClient())
            {
                //Increase the total tickets number of current worker
                $stat = Stat::where('name', 'numTickets')->where('user_id', auth()->user()->id)->first();

                if(!isset($stat))
                {
                    $stat = new Stat();
                    $stat->name = 'numTickets';
                    $stat->value = 1;
                    $stat->user_id = auth()->user()->id;
                    $stat->save();
                }
                else
                {
                    $stat->value += 1;
                    $stat->save();
                }
            }
            
            //Send notification to email of all supports
            $users = User::where('rank', 1)->get();
            foreach($users as $user)
            {
                $user->notify(new NewTicket($ticket));
            }

            //Return message and the new ticket created
            return response()->json([$ticket->load('company'), $message], 201);
        }
        //else if the ticket already exists in database
        else
        {
            $message = new Message();
            $message->user_id = auth()->user()->id; //Message user_id is always the id of the user who sent the message
            $message->body = $request->body;
            $message->ticket_id = $request->ticket_id;
            $message->save();

            $message->load('user');
            
            //Case it is a client check if ticket belongs to the user and if yes update the ticket status
            if(auth()->user()->isClient()) 
            {
                //If don't belong to this user return 401 code
                if($message->ticket->user_id != auth()->user()->id)
                {
                    return response()->json(null, 401);
                }

                $message->ticket->status = 0;
                $message->ticket->user_id = auth()->user()->id;
                $message->ticket->save();
                $message->ticket->staff->notify(new NewMessageSupport($message));
            }
            //If it is a administrator/staff update ticket status and create the stat
            else
            {
                $message->ticket->staff_id = auth()->user()->id;
                $message->ticket->status = 1;
                $message->ticket->save();
                $message->ticket->user->notify(new NewMessageClient($message));
            }
        }

        return response()->json($message, 201);
    }

    public function show($id)
    {
        $message = Message::findOrFail($id);

        return response()->json($message);
    }

    public function update(MessageRequest $request, $id)
    {
        $message = Message::findOrFail($id);
        $message->update($request->all());

        return response()->json($message, 200);
    }

    public function destroy($id)
    {
        Message::destroy($id);

        return response()->json(null, 204);
    }
}