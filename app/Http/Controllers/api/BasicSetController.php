<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BasicSetController extends Controller
{
    public $warehouse;
    public function __construct(Warehouse $warehouse)
    {
        $this->warehouse = $warehouse;
    }
    //新增仓库
    public function warehouseAdd(Request $request)
    {
        $request_data = [
            'house_code' => $request->house_code,
            'house_name' => $request->house_name,
            'position' => $request->position,
            'capacity' => $request->capacity,
            'remain_capacity' => $request->remain_capacity,
            'warehouse_status' => $request->warehouse_status,
            'storeman' => $request->storeman,
            'storeman_contact' => $request->storeman_contact
        ];
        //验证数据
        $validator = Validator::make([
            'house_name' => $request_data['house_name'],
            'position' => $request_data['position'],
            'capacity' => $request_data['capacity'],
            'remain_capacity' => $request_data['remain_capacity'],
            'warehouse_status' => $request_data['warehouse_status'],
            'storeman_contact' => $request_data['storeman_contact']

        ], [  //unique验证数据表名内对应字段唯一性
            'house_name' => 'required|unique:warehouses',
            'position' => 'required',
            'capacity' => 'numeric|nullable',
            'remain_capacity' => 'numeric|nullable',
            'warehouse_status' => 'required',
            'storeman_contact' => 'numeric|nullable'
        ]);                     //容量不能大于余量
        if ($validator->fails() || ($request_data['remain_capacity'] > $request_data['capacity'])) {
            return response()->json(StatusController::error($request_data));
        }
        //过滤空数据
        $filter_data = array_filter($request_data);
        $insert_check = $this->warehouse::create($filter_data);
        if ($insert_check) {
            return response()->json(StatusController::success($filter_data));
        }
        return response()->json(StatusController::fails($filter_data));
    }
    //仓库列表
    public function warehouseList(Request $request)
    {
        if ($request->has('id')) {
            $results = $this->warehouse::find($request->id);
            return response()->json(StatusController::success($results));
        }
        return response()->json(StatusController::success($this->warehouse::orderBy('updated_at', 'desc')->get()));
    }

    //删除仓库-单行
    public function warehouseDrop(Request $request)
    {
        $warehouse_id = $request->id;
        if (is_null($warehouse_id)) {
            return response()->json(StatusController::empty($warehouse_id));
        }

        $result = $this->warehouse::find($warehouse_id);
        if (!$result) {
            return response()->json(StatusController::notExist($result));
        }

        //执行删除操作
        $drop = $this->warehouse::where(['id' => $warehouse_id])->delete();
        return response()->json(StatusController::success($drop));
    }
    //删除仓库-多行
    public function warehouseDropMulti(Request $request)
    {
        $id = $request->id;
        if (empty($id)) {
            return response()->json(StatusController::empty($id));
        }
        //删除数据
        $drop_data = $this->warehouse::destroy($request->id);
        if ($drop_data) {
            return response()->json(StatusController::success($id));
        }
        return response()->json(StatusController::fails($id));
    }
    //编辑仓库-单行
    public function warehouseEdit(Request $request)
    {
        $warehouse_id = $request->id;
        if (is_null($warehouse_id)) {
            return response()->json(StatusController::empty($warehouse_id));
        }

        $result = $this->warehouse::find($warehouse_id);
        if (!$result) {
            return response()->json(StatusController::notExist($result));
        }
        $test = '^(\.[A-Za-z0-9_-])+@[a-zA-Z0-9]+(\.[a-zA-Z0-9_-]+)+$'; //邮箱正则

        $request_data = [
            'house_code' => $request->house_code,
            'house_name' => $request->house_name,
            'position' => $request->position,
            'capacity' => $request->capacity,
            'remain_capacity' => $request->remain_capacity,
            'warehouse_status' => $request->warehouse_status,
            'storeman' => $request->storeman,
            'storeman_contact' => $request->storeman_contact
        ];
        //验证数据
        $validator = Validator::make([
            'house_name' => $request_data['house_name'],
            'position' => $request_data['position'],
            'warehouse_status' => $request_data['warehouse_status'],

        ], [  //unique验证数据表名内对应字段唯一性
            'house_name' => 'required',
            'position' => 'required',
            'warehouse_status' => 'required',
        ]);                     //余量需小于或等于容量
        if ($validator->fails() || ($request_data['remain_capacity'] > $request_data['capacity'])) {
            return response()->json(StatusController::error($request_data));
        }

        //过滤空数据
        $filter_data = array_filter($request_data);
        $insert_check = $this->warehouse::where('id', $warehouse_id)->update($filter_data);
        if ($insert_check) {
            return response()->json(StatusController::success($filter_data));
        }
        return response()->json(StatusController::fails($filter_data));
    }
}
