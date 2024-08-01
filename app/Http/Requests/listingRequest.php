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
            'base_price'=>'integer|required',
            'price_mode'=>'string|required',
            'is_instance'=>'boolean',
            'address' => 'required|string|max:255',
            'zip-code' => ['required', 'integer', 'digits_between:3,100'],
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'images' => 'required',
            'images.*' => 'file|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video' => 'url',
            'virtual_tour'=> 'string',
            'homeyfy_accomodation.*.acc_bedroom_name' => 'string|max:255',
            'homeyfy_accomodation.*.acc_guests' => 'integer|min:1',
            'homeyfy_accomodation.*.acc_no_of_beds' => 'integer|min:1',
            'homeyfy_accomodation.*.acc_bedroom_type' => 'string|max:255',
            'homey_accomodation.*.acc_bed_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
