<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/','IndexController@index')->name('index');
//定义综合路由可以让任何路由访问都将映射到该控制器,否则会报404
Route::get('/{any}', 'IndexController@index')->where('any', '.*');

Route::get('test','TestController@index')->name('test');
