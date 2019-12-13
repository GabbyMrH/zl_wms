<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InBound extends Model
{
    //允许修改
    protected $fillable = [
        'order_num', 'item_name', 'spec', 'unit', 'item_qty', 'supplier', 'contact_man', 'contact_number','warehouse_id','remarks','status','operator'
    ];
    //转换类型
    protected $casts = [
        'id'=>'int'
    ];
    //对应仓库关联
    public function warehouse()
    {
        //'App\Models\Warehouse'
        return $this->belongsTo(Warehouse::class);
    }
}
