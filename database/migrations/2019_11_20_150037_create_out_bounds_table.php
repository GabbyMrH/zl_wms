<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutBoundsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('out_bounds', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('order_num',50)->index();
            $table->integer('item_id');
            $table->integer('item_qty')->nullable();
            $table->string('project')->nullable();
            $table->string('project_leader')->nullable();
            $table->string('construct_team')->nullable();
            $table->integer('warehouse_id');
            $table->string('remarks')->nullable();
            $table->char('operator',50);
            $table->char('recipient',50);
            $table->char('recipient_contact',50);
            $table->integer('status');
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
        Schema::dropIfExists('out_bounds');
    }
}
