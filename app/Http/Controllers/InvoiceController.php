<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvoiceRequest;
use App\Invoice;
use Carbon\Carbon;
use App\CompanyInformation;
use Storage;
use App\Stat;

class InvoiceController extends Controller
{
    public function index()
    {
        if(auth()->user()->isAdmin() || auth()->user()->isFinancial())
        {
            $invoices = Invoice::with('company')->with('ticket')->latest()->get();
        }
        else
        {
            $invoices = Invoice::with('company')->with('ticket')->latest()->where('company_id', auth()->user()->company_id)->get();
        }

        return response()->json($invoices);
    }

    public function store(InvoiceRequest $request)
    {
        if(auth()->user()->isClient() || auth()->user()->isSupport())
        {
            return response()->json(null, 401);
        }

        $request->validate([
            'ticket_id' => 'required',
            'items' => 'required',
            'currency' => 'required',
            'company_id' => 'required',
            'status' => 'required',
            'items' => 'required'
        ]);
        
        $invoiceURL = md5(Carbon::now()->isoFormat('dddd, MMMM D, YYYY h:mm A'));

        //Save invoice on database
        $invoice = new Invoice();
        $invoice->ticket_id = $request->ticket_id;
        $invoice->items = json_encode($request->items);
        $invoice->taxes = json_encode(json_decode($request->taxes));
        $invoice->url =   $invoiceURL. '.pdf';
        $invoice->notes = $request->notes;
        $invoice->company_id = $request->company_id;
        $invoice->currency = $request->currency;
        $invoice->staff_id = auth()->user()->id;
        $invoice->dueDate = Carbon::parse($request->dueDate);
        $invoice->status = $request->status;
        //Calculate total money (without tax)
        foreach($request->items as $item)
        {
            $invoice->totalMoney += doubleval($item['price']);
        }
               
        $invoice->load('company');
        $invoice->load('ticket');
        $invoice->save();
        
        $company = CompanyInformation::first();
        
        $invoicePDF = \ConsoleTVs\Invoices\Classes\Invoice::make();
        $invoicePDF->currency = $invoice->currency;
        $invoicePDF->dueDate = Carbon::parse($invoice->dueDate);

        foreach(json_decode($invoice->items) as $item)
        {
            $invoicePDF->addItem($item->name, $item->price);
        }
        if($invoice->taxes != '""')
        {
            foreach(json_decode($invoice->taxes) as $tax)
            {
                $invoicePDF->tax($tax->percentage);
            }
        }
        $invoicePDF->number($invoice->id)
        ->notes($invoice->notes)
        ->customer([
            'name'      => $invoice->company->name,
            'id'        => $invoice->company->vat,
            'phone'     => $invoice->company->email,
            'location'  => $invoice->company->address,
        ])
        ->business([
            'name'        => $company->name,
            'id'          => $company->number,
            'phone'       => $company->phone,
            'location'    => $company->address,
        ])
        ->date($invoice->created_at)
        ->save('public/invoices/'. $invoiceURL .'.pdf');

        //Increase the total invoices
        $stat = Stat::where('name', 'numInvoices')->first();

        if(!isset($stat))
        {
            $stat = new Stat();
            $stat->name = 'numInvoices';
            $stat->value = 1;
            $stat->user_id = 0;
            $stat->save();
        }
        else
        {
            $stat->value += 1;
            $stat->save();
        }

        return response()->json($invoice, 201);
    }

    /*public function show($id)
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
    }*/

    public function destroyBulk($ids)
    {
        $ids = json_decode(urldecode($ids));
        foreach($ids as $id)
        {
            $invoice = Invoice::find($id);

            Storage::delete('public/invoices/' . $invoice->url);
            $invoice->destroy($id);
        }

        return response()->json($ids, 200);
    }

    public function pay($ids)
    {
        //Increase the total invoices
        $stat = Stat::where('name', 'paidInvoices')->first();
        $stat2 = Stat::where('name', 'totalMoney')->first();

        $ids = json_decode(urldecode($ids));
        foreach($ids as $id)
        {
            $invoice = Invoice::find($id);
            $invoice->status = 1;
            $invoice->save();

            if(!isset($stat))
            {
                $stat = new Stat();
                $stat->name = 'paidInvoices';
                $stat->value = 1;
                $stat->user_id = 0;
                $stat->save();
            }
            else
            {
                $stat->value += 1;
                $stat->save();
            }

            if(!isset($stat2))
            {
                $stat2 = new Stat();
                $stat2->name = 'totalMoney';
                $stat2->value = $invoice->totalMoney;
                $stat2->user_id = 0;
                $stat2->save();
            }
            else
            {
                $stat2->value += $invoice->totalMoney;
                $stat2->save();
            }

        }

        return response()->json($ids, 200);
    }
}