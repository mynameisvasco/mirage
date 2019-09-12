<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyInformationRequest;
use App\CompanyInformation;
use Storage;

class CompanyInformationController extends Controller
{
    public function index()
    {
        $companyinformations = CompanyInformation::first();

        //Case no information add the default information (ONLY 1 COMPANY INFORMATION RECORD ALLOWED)
        if(!isset($companyinformations)) {
            $companyinformation = new CompanyInformation();
            $companyinformation->save();
        }
        $companyinformations = CompanyInformation::first();
        return response()->json($companyinformations);
    }

    public function store(CompanyInformationRequest $request)
    {
        $companyinformation = CompanyInformation::create($request->all());

        return response()->json($companyinformation, 201);
    }

    public function show($id)
    {
        $companyinformation = CompanyInformation::findOrFail($id);

        return response()->json($companyinformation);
    }

    public function update(CompanyInformationRequest $request, $id)
    {
        $companyinformation = CompanyInformation::findOrFail($id);
        $companyinformation->update($request->except(['taxes', 'logo']));
        $companyinformation->taxes = json_encode(json_decode($request->taxes));
        if($request->hasFile('logo'))
        {
            $request->logo->storeAs('public/company', 'logo.png');
        }
        $companyinformation->save();
        
        return response()->json($companyinformation, 200);
    }

    public function destroy($id)
    {
        CompanyInformation::destroy($id);

        return response()->json(null, 204);
    }
}