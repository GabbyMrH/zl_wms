<?php

use App\Models\InBound;
use Illuminate\Database\Seeder;

class InBoundsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //执行迁移文件
        $inbounds = factory(InBound::class)->times(100)->make();
        InBound::insert($inbounds->toArray());
    }
}
