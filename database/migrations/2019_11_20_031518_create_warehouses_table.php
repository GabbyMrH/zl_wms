<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWarehousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('house_code',20)->index()->nullable();
            $table->char('house_name',50)->default(null);
            $table->string('position')->nullable();
            $table->integer('capacity')->nullable();
            $table->integer('remain_capacity')->nullable();
            $table->string('storeman')->nullable();
            $table->char('storeman_contact',50)->nullable();
            $table->integer('warehouse_status')->default(null);
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
        Schema::dropIfExists('warehouses');
    }
}
