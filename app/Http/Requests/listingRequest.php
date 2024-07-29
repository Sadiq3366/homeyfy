<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class listingRequest extends FormRequest
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
            'listing_title'=>'required|string|max:225',
            'description'=>'required|string|min:10',
            'listing_type'=>'required|string',
            'listing_bedrooms'=>'integer',
            'guests'=>'integer',
            'beds' => 'integer',
            'baths'=>'integer',
            'listing_rooms'=>'integer',
            'listing_size'=>'string',
            'listing_size_unit'=>'string',
            'affiliate_booking_link'=>'string',
            'address' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'area' => 'required|string|max:255',
        ];
    }
}
