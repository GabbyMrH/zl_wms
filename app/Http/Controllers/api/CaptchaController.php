<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\api\StatusController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CaptchaRequest;
use App\Http\Requests\api\VerificationCodeRequest;
use Gregwar\Captcha\CaptchaBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class CaptchaController extends Controller
{
    //分别调用验证码表单验证器和验证码生成类
    //此处可改良为每次调用验证码都需要appkey以及appid,以防止验证码被乱调用
    public function getCode(CaptchaRequest $request,CaptchaBuilder $captchaBuilder)
    {
        $key = 'captcha-'.Str::random(15);
        $userId = $request->user_id;
        // $userKey = $request->user_key;

        //验证码
        $captcha = $captchaBuilder->build();
        //过期时间
        $expiredAt = now()->addMinutes(2);
        //存入缓存
        Cache::put($key,['user_id'=>$userId,'code'=>$captcha->getPhrase()],$expiredAt);

        $result = [
            'captcha_key'=>$key,
            'expired_at'=>$expiredAt->toDateTimeString(),
            'captcha_image_content'=>$captcha->inline()
        ];

        return response()->json($result);
    }
    //校验验证码
    public function store(VerificationCodeRequest $request)
    {
        //获取验证码key
        $captchaData = Cache::get($request->captcha_key);
        if(!$captchaData){
            return response()->json(StatusController::error('验证码已失效'));
        }

        //hash_equals可防止数据被时序攻击
        if(!hash_equals($captchaData['code'],$request->captcha_code)){
            //验证错误则清除缓存
            Cache::forget($request->captcha_key);
            return response()->json(StatusController::fails('验证码错误'));
        }

        return response()->json(StatusController::success('成功'));
    }
}
