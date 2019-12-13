<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\OutBound;
use Faker\Generator as Faker;

$factory->define(OutBound::class, function (Faker $faker) {
    $date_time = $faker->date . ''.$faker->time();
    return [
        //虚拟数据格式
        'house_code'=>random_int(111,999),
        'house_name'=>$faker->company,
        'position'=>$faker->address,
        'capacity'=>$faker->randomDigit,
        'remain_capacity'=>$faker->randomDigit,
        'storeman'=>$faker->name,
        'storeman_contact'=>$faker->phoneNumber,
        'warehouse_status'=>$faker->randomElement([1,-1]),
        'created_at' => $date_time,
        'updated_at' => $date_time,
    ];
});
