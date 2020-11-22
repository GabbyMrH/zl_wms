<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AuthorizationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthorizationsController extends Controller
{
    //登录
    public function store(AuthorizationRequest $request)
    {
        $username = $request->username;
        //用户可以使用邮箱或手机号登录
        filter_var($username, FILTER_VALIDATE_EMAIL) ?
            $credentials['email'] = $username : $credentials['phone'] = $username;
            $credentials['password'] = $request->password;

        //验证用户信息
        //Auth::guard('api')与config目录的auth下的guards->api对应
        //由于我已经把驱动移交给jwt，所以将采用jwt验证
        $token = Auth::guard('api')->attempt($credentials);
        if (!$token) {
            return response()->json(StatusController::error('账号或密码错误'));
        }

        //返回jwt信息
        return $this->respondWithToken($token)->setStatusCode(201);
    }

    /* 生成token--由于在.env已经设置好了key，这里专注验证和生成即可 */
    protected function respondWithToken($token)
    {
        //返回jwt信息,60分钟有效期
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60
        ]);
    }
    /* 刷新token */
    public function update()
    {
        $token = Auth::guard('api')->refresh();
        return $this->respondWithToken($token);
    }
    /* 删除token */
    public function destroy()
    {
        Auth::guard('api')->logout();
        return response(null,204);
    }
}
