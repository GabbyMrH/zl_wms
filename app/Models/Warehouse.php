<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $table = 'warehouses';
    //允许新增
    protected $fillable = [
        'house_code','house_name','position','capacity','remain_capacity','storeman','storeman_contact','warehouse_status'
    ];
    //一对多关联入库单
    public function inBounds()
    {
        return $this->hasMany('App\Models\InBound');
    }
}
