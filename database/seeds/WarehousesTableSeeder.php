<?php

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehousesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //执行迁移文件
        $warehouses = factory(Warehouse::class)->times(100)->make();
        Warehouse::insert($warehouses->toArray());
    }
}
