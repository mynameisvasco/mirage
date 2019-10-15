<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Company;

class CompanyController extends Controller
{
    public function index()
    {
        //Clients can't index all companies
        if(auth()->user()->isClient())
        {
            return response()->json(null, 401);
        }

        $companies = Company::with('items')->latest()->get();

        return response()->json($companies);
    }

    public function store(CompanyRequest $request)
    {
        //Only Admins can create new company if not admin gives 401 code
        if(!auth()->user()->isAdmin())
        {
            return response()->json(null, 401);
        }

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:companies',
            'phone' => 'required',
            'max_users' => 'required',
            'address' => 'required',
            'number' => 'required',
        ]);
        
        $company = new Company();
        $company->name = $request->name;
        $company->email = $request->email;
        $company->phone = $request->phone;
        $company->max_users = $request->max_users;
        $company->address = $request->address;
        $company->number = $request->number;

        if($request->hasFile('picture'))
        {
            $request->picture->storeAs('public/companies', md5($request->email) . '.' . $request->picture->getClientOriginalExtension());
            $company->picture = md5($request->email) . '.' . $request->picture->getClientOriginalExtension();
        }
        else
        {
            $company->picture = null;
        }

        $company->save();
        return response()->json($company, 201);
    }

    public function show($id)
    {
         //Clients can only see their company
         if(auth()->user()->isClient() && $id != auth()->user()->company_id)
         {
             return response()->json(null, 401);
         }
 
        $company = Company::with('items')->with('users')->findOrFail($id);

        return response()->json($company);
    }

    public function update(CompanyRequest $request, $id)
    {
        //Clients can only update their company
        if(auth()->user()->isClient())
        {
            if(auth()->user()->company_id != $id && auth()->user()->company_rank != 3)
            {
                return response()->json(null, 401);
            }
        }
        $request->validate([
            'name' => 'required|string',
            'email' => "unique:companies,email,$id,id",
            'phone' => 'required',
            'address' => 'required',
            'number' => 'required',
        ]);
        
        $company = Company::find($id);
        $company->name = $request->name;
        $company->email = $request->email;
        $company->phone = $request->phone;
        $company->address = $request->address;
        $company->number = $request->number;

        if($request->hasFile('picture'))
        {
            $request->picture->storeAs('public/companies', md5($request->email) . '.' . $request->picture->getClientOriginalExtension());
            $company->picture = md5($request->email) . '.' . $request->picture->getClientOriginalExtension();
        }
        else
        {
            $company->picture = null;
        }

        $company->save();
        $company->load('items');
        return response()->json($company, 200);
    }

    public function destroy($id)
    {
        //Only Admins can delete a company if not admin gives 401 code
        if(!auth()->user()->isAdmin())
        {
            return response()->json(null, 401);
        }
        $company = Company::find($id);
        $company->tickets()->delete($id);
        $company->invoices()->delete($id);
        $company->users()->delete($id);
        $company->items()->delete($id);
        $company->delete($id);
        
        return response()->json(null, 204);
    }
}