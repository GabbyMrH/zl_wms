<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    //加载主页
    public function index()
    {
        return view('index');
    }
}
