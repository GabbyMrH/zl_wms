<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatusController extends Controller
{

  public static $result = [];
  /*
    * 返回值 1--
    */

  //数据为空
  public static function empty($data)
  {
    self::$result = [
      'data' => $data,
      'status' => '1001',
      'msg' => '参数为空'
    ];
    return self::$result;
  }
  //数据不存在
  public static function notExist($data)
  {
    self::$result = [
      'data' => $data,
      'status' => '1002',
      'msg' => '数据不存在'
    ];
    return self::$result;
  }

  /*
    * 返回值 2--
    */

  //成功
  public static function success($data)
  {
    self::$result = [
      'data' => $data,
      'status' => '2001',
      'msg' => '成功'
    ];
    return self::$result;
  }

  /*
    * 返回值 4--
    */

  //数据有误
  public static function error($data)
  {
    self::$result = [
      'data' => $data,
      'status' => '4001',
      'msg' => '参数有误'
    ];
    return self::$result;
  }
  //数据有误
  public static function fails($data)
  {
    self::$result = [
      'data' => $data,
      'status' => '4002',
      'msg' => '失败'
    ];
    return self::$result;
  }
}
