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
            'listing_bedrooms'=>'nullable|integer',
            'guests'=>'nullable|integer',
            'l_beds' => 'nullable|integer',
            'baths'=>'nullable|integer',
            'listing_rooms'=>'nullable|integer',
            'listing_size'=>'nullable|string',
            'listing_size_unit'=>'nullable|string',
            'affiliate_booking_link'=>'nullable|string',
            'base_price'=>'integer|required',
            'is_instance'=>'nullable|boolean',
            'map_address' => 'required|string|max:255',
            'zipCode' => ['required', 'string', 'digits_between:3,100'],
            'state' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'latitude' => 'numeric',
            'longitude' => 'numeric',
            'images' => 'required',
            'images.*' => 'url',
            'featured_image'=>'nullable|url',
            'video' => 'nullable|url',
            'virtual_tour'=> 'nullable|string',
            'homeyfy_accomodation' => 'nullable|array',
            'homeyfy_accomodation.*.acc_bedroom_name' => 'nullable|string',
            'homeyfy_accomodation.*.acc_guests' => 'nullable|integer',
            'homeyfy_accomodation.*.acc_no_of_beds' => 'nullable|integer',
            'homeyfy_accomodation.*.acc_bedroom_type' => 'nullable|string',
            'homeyfy_accomodation.*.acc_bed_image' => 'nullable|string|url',
            'homeyfy_extra' => 'nullable|array',
            'homeyfy_extra.*.name' => 'nullable|string',
            'homeyfy_extra.*.price' => 'nullable|integer',
            'homeyfy_extra.*.type' => 'nullable|string',
            'homeyfy_services' => 'nullable|array',
            'homeyfy_services.*.name' => 'nullable|string',
            'homeyfy_services.*.price' => 'nullable|integer',
            'homeyfy_services.*.bed' => 'nullable|integer',

        ];
    }
}
