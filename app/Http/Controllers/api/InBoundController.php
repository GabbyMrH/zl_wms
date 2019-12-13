<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\InBound;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class InBoundController extends Controller
{
    protected $inBound;
    protected $warehouse;
    public function __construct(InBound $inBound, Warehouse $warehouse)
    {
        $this->inBound = $inBound;
        $this->warehouse = $warehouse;
    }
    /**
     * 数据显示.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //关联查询内使用子查询过滤相同的update字段以便于倒序输出
        $data = DB::table('in_bounds')->join(DB::raw('(select id,house_name,position from warehouses) as warehouses'), 'in_bounds.warehouse_id', '=', 'warehouses.id')
            ->orderBy('updated_at', 'desc')
            ->select('in_bounds.*', 'warehouses.house_name')->get();
        return $data ? response()->json(StatusController::success($data)) : response()->json(StatusController::fails($data));
    }

    /**
     * 新增入库.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //调用验证器
        $validator = Validator::make($request->all(), [
            //「exists:warehouses,id」该参数在warehouses表中的id字段必须对应 &&「digits_between:1,11」必须数字且长度受限
            'warehouse_id' => 'required|exists:warehouses,id|digits_between:1,11',
            'item_name' => 'required',
            'status' => 'required|numeric',
            'operator' => 'required',
            'spec' => 'numeric|nullable',
            'unit' => 'numeric|nullable',
            'item_qty' => 'numeric|nullable'
        ]);
        if ($validator->fails()) {
            return response()->json(StatusController::error($request->all()));
        }
        //查询库存余量，若小于0则拒绝入库
        $warehouse = $this->warehouse->find($request->warehouse_id);

        if ($warehouse->remain_capacity <= 0) {
            return response()->json(StatusController::fails($warehouse->remain_capacity));
        }
        //写入数据格式
        $data = $request->all();
        $data['order_num'] = 'ZL' . date('YmdHis', time()) . random_int(10000, 99999);

        //入库校验
        $db_create = $this->inBound->create($data);
        if ($db_create) {
            //仓库库存递减1
            $this->warehouse->find($request->warehouse_id)->decrement('remain_capacity');
            return response()->json(StatusController::success($data));
        }
        return response()->json(StatusController::error($data));
    }

    /**
     * 显示指定数据.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $db_data = $this->inBound->find($id);
        return $db_data ? response()->json(StatusController::success($db_data)) : response()->json(StatusController::fails($id));
    }


    /**
     * 编辑指定数据.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //校验传递数据
        $validator = Validator::make($request->all(), [
            'warehouse_id' => 'required|exists:warehouses,id|digits_between:1,11',
            'item_name' => 'required',
            'status' => 'required|numeric',
            'operator' => 'required',
            'spec' => 'numeric|nullable',
            'unit' => 'numeric|nullable',
            'item_qty' => 'numeric|nullable'
        ]);
        //由于inbound表没有house_name,所以需要弹出house_name
        //此处由于$request是引用类型，需要进行赋值变量后方能调用
        $data = $request->all();
        Arr::pull($data, 'house_name');
        $data['updated_at'] = Carbon::now();
        if ($validator->fails()) {
            return response()->json(StatusController::error($request->all()));
        }
        //数据更新
        $db_update = $this->inBound->where('id', $id)->update($data);
        return $db_update ? response()->json(StatusController::success($data)) : response()->json(StatusController::fails($data));
    }

    /**
     * 删除指定数据.
     *
     * @param  array  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //数组内字符串转数字--前端设置传递值为number类型则不需要转换
        $integerIDs = array_map('intval', explode(',', $id));
        //以数组形式接收，便于批量删除
        $db_drop = $this->inBound->destroy($integerIDs);
        return $db_drop ? response()->json(StatusController::success($integerIDs)) : response()->json(StatusController::fails($integerIDs));
    }

    /* *
     *  时间筛选
     */
    public function datePicker(Request $request)
    {
        //时间查询用whereBetween会少一天
        $query = DB::table('in_bounds')->join(DB::raw('(select id,house_name,position from warehouses) as warehouses'), 'in_bounds.warehouse_id', '=', 'warehouses.id')
            ->orderBy('updated_at', 'desc')
            ->whereDate('in_bounds.updated_at', '>=', $request->start_time)
            ->whereDate('in_bounds.updated_at', '<=', $request->end_time)
            ->select('in_bounds.*', 'warehouses.house_name')
            ->get();
        return $query ? response()->json(StatusController::success($query)) : response()->json(StatusController::fails($query));
    }

    /* *
     *  条件筛选
     */
    public function itemQuery(Request $request)
    {   //1为订单号=>$request->select_item，2为产品名称=>$request->item_data
        if ($request->select_item == '1') {
            $query = DB::table('in_bounds')->join(DB::raw('(select id,house_name,position from warehouses) as warehouses'), 'in_bounds.warehouse_id', '=', 'warehouses.id')
                ->orderBy('updated_at', 'desc')
                ->where('in_bounds.order_num', $request->item_data)
                ->select('in_bounds.*', 'warehouses.house_name')
                ->get();
            return $query ? response()->json(StatusController::success($query)) : response()->json(StatusController::fails($query));
        }
        if ($request->select_item == '2') {
            $query = DB::table('in_bounds')->join(DB::raw('(select id,house_name,position from warehouses) as warehouses'), 'in_bounds.warehouse_id', '=', 'warehouses.id')
                ->orderBy('updated_at', 'desc')
                ->where('in_bounds.item_name', $request->item_data)
                ->select('in_bounds.*', 'warehouses.house_name')
                ->get();
            return $query ? response()->json(StatusController::success($query)) : response()->json(StatusController::fails($query));
        }
        return response()->json(StatusController::error('error'));
    }
}
