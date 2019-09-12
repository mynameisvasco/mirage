<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Message;
use App\Ticket;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::latest()->with('user')->with('ticket')->get();

        return response()->json($messages);
    }

    public function store(MessageRequest $request)
    {
        $request->validate([
            'body' => 'required',
            'ticket_id' => 'required',
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
            $ticket->save();

            //Create the message
            $message = new Message();
            $message->body = $request->body;
            $message->user_id = auth()->user()->id;
            $message->ticket_id = $ticket->id;
            $message->save();

            //Return message and the new ticket created
            return response()->json([$ticket->load('user'), $message], 201);
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
                $message->ticket->staff_id = 0;
                $message->ticket->save();
            }
            //If it is a administrator/staff update ticket status
            else
            {
                $message->ticket->staff_id = auth()->user()->id; //This is always the user_id of the staff assigned to that ticket
                $message->ticket->status = 1;
                $message->ticket->save();
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