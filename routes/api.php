<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'auth'], function () 
{
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup')->middleware('auth:api');
  
    Route::group(['middleware' => 'auth:api'], function() 
    {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group(['middleware' => 'auth:api'], function() 
{
    Route::get('/users/rank/{rank}', 'AuthController@users');
    Route::get('/users/{id}', 'AuthController@user1');
    Route::post('/users/changepassword', 'AuthController@changePassword');
    Route::put('/users/{id}', 'AuthController@editUser');
    Route::delete('/users/{id}', 'AuthController@deleteUser');

    Route::get('/stats', 'StatsController@index');
    
    Route::resource('tickets', 'TicketController');
    Route::get('/tickets/resolved/{company_id}', 'TicketController@getResolved');

    Route::resource('messages', 'MessageController');
    Route::resource('invoices', 'InvoiceController');
    Route::resource('companies', 'CompanyController');
    Route::resource('items', 'ItemController');
    Route::resource('companyinformations', 'CompanyInformationController');
    Route::delete('/invoices/bulk/{ids}', 'InvoiceController@destroyBulk');
    Route::put('/invoices/pay/{ids}', 'InvoiceController@pay');
});