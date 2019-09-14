<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemRequest;
use App\Item;

class ItemController extends Controller
{
    public function index()
    {
        $inventories = Item::latest()->get();

        return response()->json($inventories);
    }

    public function store(ItemRequest $request)
    {
        $inventory = Item::create($request->all());

        return response()->json($inventory, 201);
    }

    public function show($id)
    {
        $inventory = Item::findOrFail($id);

        return response()->json($inventory);
    }

    public function update(ItemRequest $request, $id)
    {
        $inventory = Item::findOrFail($id);
        $inventory->update($request->all());

        return response()->json($inventory, 200);
    }

    public function destroy($id)
    {
        Item::destroy($id);

        return response()->json(null, 204);
    }
}