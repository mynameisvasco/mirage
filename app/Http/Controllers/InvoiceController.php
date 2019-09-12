<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Invoice;
use Carbon\Carbon;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with('user')->latest()->get();

        return response()->json($invoices);
    }

    public function store(InvoiceRequest $request)
    {
        $request->validate([
            'name' => 'required|string',
            'items' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'status' => 'required'
        ]);
        
        //Save invoice on database
        $invoice = new Invoice();
        $invoice->name = $request->name;
        $invoice->items = json_encode($request->items);
        $invoice->taxes = json_encode(json_decode($request->taxes));
        $invoice->description = $request->description;
        $invoice->notes = $request->notes;
        $invoice->user_id = $request->user_id;
        $invoice->staff_id = auth()->user()->id;
        $invoice->dueDate = Carbon::parse($request->dueDate);
        $invoice->status = $request->status;

        //Calculate total money
        foreach($request->items as $item)
        {
            $invoice->totalMoney += doubleval($item['price']);
        }

        $invoice->save();
        $invoice->load('user');

        //Generate invoice file
        $invoice = ConsoleTVs\Invoices\Classes\Invoice::make()
                ->addItem('Test Item', 10.25, 2, 1412)
                ->addItem('Test Item 2', 5, 2, 923)
                ->addItem('Test Item 3', 15.55, 5, 42)
                ->addItem('Test Item 4', 1.25, 1, 923)
                ->addItem('Test Item 5', 3.12, 1, 3142)
                ->addItem('Test Item 6', 6.41, 3, 452)
                ->addItem('Test Item 7', 2.86, 1, 1526)
                ->number(4021)
                ->tax(21)
                ->notes('Lrem ipsum dolor sit amet, consectetur adipiscing elit.')
                ->customer([
                    'name'      => 'Èrik Campobadal Forés',
                    'id'        => '12345678A',
                    'phone'     => '+34 123 456 789',
                    'location'  => 'C / Unknown Street 1st',
                    'zip'       => '08241',
                    'city'      => 'Manresa',
                    'country'   => 'Spain',
                ])->save('public/myinvoicename.pdf');
        return response()->json($invoice, 201);
    }

    public function show($id)
    {
        $invoice = Invoice::findOrFail($id);

        return response()->json($invoice);
    }

    public function update(InvoiceRequest $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->all());

        return response()->json($invoice, 200);
    }

    public function destroy($id)
    {
        Invoice::destroy($id);

        return response()->json(null, 204);
    }
}