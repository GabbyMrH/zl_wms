<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInBoundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('in_bounds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('order_num',50)->index();
            $table->string('item_name');
            $table->string('spec')->nullable();
            $table->char('unit',20)->nullable();
            $table->integer('item_qty')->nullable();
            $table->string('supplier')->nullable();
            $table->string('contact_man')->nullable();
            $table->string('contact_number')->nullable();
            $table->integer('warehouse_id');
            $table->string('remarks')->nullable();
            $table->integer('status');
            $table->char('operator',50);
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
        Schema::dropIfExists('in_bounds');
    }
}
