<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Warehouse;
use Faker\Generator as Faker;

$factory->define(Warehouse::class, function (Faker $faker) {
    $date_time = $faker->date . ''.$faker->time();
    $capacity = $faker->randomDigit;
    return [
        //虚拟数据格式--容量与余量一开始应是对等的
        'house_code'=>random_int(111,999),
        'house_name'=>$faker->company,
        'position'=>$faker->address,
        'capacity'=>$capacity,
        'remain_capacity'=>$capacity,
        'storeman'=>$faker->name,
        'storeman_contact'=>$faker->phoneNumber,
        'warehouse_status'=>$faker->randomElement([1,-1]),
        'created_at' => $date_time,
        'updated_at' => $date_time,
    ];
});
