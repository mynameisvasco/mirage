<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('ticket_id');
            $table->json('items')->nullable()->deafult(null); //{'name': 'Example', 'price': '$50'}
            $table->json('taxes')->nullable()->deafult(null); //{'name': 'VAT', 'percentage': '0.15'}
            $table->double('totalMoney');
            $table->string('url');
            $table->mediumText('notes')->nullable()->default(null);
            $table->integer('company_id');
            $table->integer('staff_id');
            $table->date('dueDate');
            $table->integer('status')->default(0);
            $table->string('currency')->default("GBP");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
}
