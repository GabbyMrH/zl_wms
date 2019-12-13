<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    //用户信息
    public function show(User $user,Request $request)
    {
        //返回用户资源信息--资源信息专门为api而设计
        return new UserResource($user);
    }
    //当前用户信息
    public function me(Request $request)
    {
        return new UserResource($request->user());

    }
}
