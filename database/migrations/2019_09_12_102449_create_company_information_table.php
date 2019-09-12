<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyInformationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_information', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->default('mirage');
            $table->string('logo')->default('logo.png');
            $table->string('address')->default('Imaginary Street no 7');
            $table->string('email')->default('info@mirage.io');
            $table->string('phone')->default('+351 000 000 000');
            $table->integer('number')->default('0000000');
            $table->json('taxes')->default('[]');
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
        Schema::dropIfExists('company_informations');
    }
}
