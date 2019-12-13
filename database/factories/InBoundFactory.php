<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\InBound;
use App\Models\Warehouse;
use Faker\Generator as Faker;

$factory->define(InBound::class, function (Faker $faker) {
    $date_time = $faker->date . ''.$faker->time();
    $format_date = date($format = 'YmdHis', $max = time());
    return [
        //虚拟数据格式
        'order_num'=>'ZL'.$format_date.random_int(10000,99999),
        'item_name'=>$faker->company,
        'spec'=>$faker->randomDigit,
        'unit'=>$faker->randomDigit,
        'item_qty'=>$faker->randomDigit,
        'supplier'=>$faker->company,
        'contact_man'=>$faker->name,
        'contact_number'=>$faker->phoneNumber,
        'warehouse_id'=>Warehouse::inRandomOrder()->value('id'),
        'remarks'=>$faker->city,
        'status'=>$faker->randomElement([1,-1]),
        'operator'=>$faker->name,
        'created_at' => $date_time,
        'updated_at' => $date_time,
    ];
});
