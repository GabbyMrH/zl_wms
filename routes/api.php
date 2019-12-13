<?php

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('api')->prefix('v1')->group(function () {
    /* 调用验证码接口 */
    Route::get('captchas','CaptchaController@getCode');
    //校验验证码
    Route::post('captchas','CaptchaController@store');

    //用户登录-通过jwt-auth验证
    Route::post('authorizations','AuthorizationsController@store');
    // 刷新token
    Route::put('authorizations/current', 'AuthorizationsController@update');
    // 删除token
    Route::delete('authorizations/current', 'AuthorizationsController@destroy');

    /* 截流限制用户获取数据,以配置文件内的限流信息为准 */
    Route::middleware('throttle:'.config('api.rate_limits.access'))->group(function(){
        //游客可访问的接口
        //用户详情
        Route::get('users/{user}','UsersController@show');

        //登录后可访问的接口
        Route::middleware('auth:api')->group(function(){
            //当前登录用户信息
            Route::get('user','UsersController@me');
        });
    });

    /*基本设置-仓库 */
    //列表
    Route::get('/warehouse-list/{id?}', 'BasicSetController@warehouseList');
    //新增-单行
    Route::post('/warehouse-add', 'BasicSetController@warehouseAdd');
    //删除-单行
    Route::delete('/warehouse-drop/{id?}', 'BasicSetController@warehouseDrop');
    //删除-多行
    Route::delete('/warehouse-dropMulti','BasicSetController@warehouseDropMulti');
    //编辑-单行
    Route::post('/warehouse-edit/{id?}', 'BasicSetController@warehouseEdit');

    /* 入库管理资源控制器 */
    Route::resource('inbounds', 'InBoundController');
    //日期筛选
    Route::get('inbounds-date','InBoundController@datePicker');
    //订单筛选
    Route::get('inbounds-item','InBoundController@itemQuery');
});
