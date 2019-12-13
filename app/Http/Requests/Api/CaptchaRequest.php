<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CaptchaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //配置规则--输入id必须在users表存在对应值
            'user_id'=>'required|exists:users,id',
            // 'user_key'=>'required|unique|string|exists:users,user_key'
        ];
    }
}
