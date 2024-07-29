<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class userRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name'=>'required|string|max:225',
            'last_name'=>'required|string|max:225',
            'email_verified_at'=>'integer|max:2',
            'user_name'=>['required','string', 'regex:/^\S*$/','max:225','unique:users'],
            'email'=>'required|string|email|unique:users|max:225',
            'phone' => ['required', 'string', 'regex:/^[0-9]{6,20}$/'],
            'password'=>'required|string|min:6|confirmed',
            'user_type'=>'required|string|max:20',
        ];
    }
}
