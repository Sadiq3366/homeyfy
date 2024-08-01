<?php

namespace App\Http\Controllers;

use App\Http\Requests\listingRequest;
use App\Models\Area;
use App\Models\City;
use App\Models\Country;
use App\Models\Listings;
use App\Models\State;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
* @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
    * )
 */
class listingController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/listing/add-new",
     *     summary="Create a new listing",
     *     description="Create a new listing",
     *     tags={"Listings"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 type="object",
     *                 required={"listing_title", "description", "listing_type","base_price","price_mode","address","state","city","country","zip-code","images"},
     *                 @OA\Property(property="listing_title", type="string", example="Beautiful Apartment"),
     *                 @OA\Property(property="description", type="string", example="A beautiful apartment in the city center."),
     *                 @OA\Property(property="listing_type", type="string", example="Apartment"),
     *                 @OA\Property(property="base_price", type="integer", example="456"),
     *                 @OA\Property(property="price_mode", type="string", example="per night"),
     *                 @OA\Property(property="is_instance", type="string", example="1"),
     *                 @OA\Property(property="listing_bedrooms", type="integer", example=2),
     *                 @OA\Property(property="guests", type="integer", example=4),
     *                 @OA\Property(property="beds", type="integer", example=2),
     *                 @OA\Property(property="baths", type="integer", example=1),
     *                 @OA\Property(property="listing_rooms", type="integer", example=3),
     *                 @OA\Property(property="listing_size", type="integer", example=1200),
     *                 @OA\Property(property="listing_size_unit", type="string", example="sqft"),
     *                 @OA\Property(property="affiliate_booking_link", type="string", example="https://example.com"),
     *                 @OA\Property(property="address", type="string", example="suny pul RYK"),
     *                 @OA\Property(property="state", type="string", example="Punjab"),
     *                 @OA\Property(property="city", type="string", example="RYK"),
     *                 @OA\Property(property="country", type="string", example="Pakistan"),
     *                 @OA\Property(property="area", type="string", example="suny pul"),
     *                 @OA\Property(property="zip-code", type="integer", example="12345"),
     *                 @OA\Property(property="images", type="array",@OA\Items(type="string",format="binary"), example={"image1.png", "image2.jpg"}),
     *                 @OA\Property(property="video", type="text", example="www.example.com"),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Listing saved successfully"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="There was an error saving the listing. Please try again."
     *     )
     * )
     */

    public function submit(listingRequest $request)
    {

        $validated = $request->validated();

        $state = State::firstOrCreate(['name' => $validated['state']]);

        // Create or retrieve the city
        $city = City::firstOrCreate(['name' => $validated['city'], 'state_id' => $state->id]);

        // Create or retrieve the country
        $country = Country::firstOrCreate(['name' => $validated['country']]);

        // Create or retrieve the area
        $area = Area::firstOrCreate(['name' => $validated['area'], 'city_id' => $city->id]);

        // Create the Listing record
        $listing = Listings::create([
            'listing_title' => $validated['listing_title'],
            'description' => $validated['description'],
            'user_id' => Auth::id(),
            'listing_type' => $validated['listing_type'],
            'base_price' => $validated['base_price'],
            'price_mode' => $validated['price_mode'],
            'is_instance' => $validated['is_instance'],
            'status' => 'publish',
            'listing_bedrooms' => $validated['listing_bedrooms'],
            'guests' => $validated['guests'],
            'beds' => $validated['beds'],
            'baths' => $validated['baths'],
            'listing_rooms' => $validated['listing_rooms'],
            'listing_size' => $validated['listing_size'],
            'listing_size_unit' => $validated['listing_size_unit'],
            'affiliate_booking_link' => $validated['affiliate_booking_link'],
        ]);

        // Create the Address record
        $listing->addresses()->create([
            'address' => $validated['address'],
            'zip-code'=>$validated['zip-code'],
            'state_id' => $state->id,
            'city_id' => $city->id,
            'country_id' => $country->id,
            'area_id' => $area->id,
        ]);

        $images = [];

        if($request->hasFile('images')){
            foreach ($request->file('images') as $image){

                $image_name = time().rand(99,9999).'.'.$image->getClientOriginalName();
                $image_path = Storage::putFileAs('public/images',$image,$image_name);
                $images []= $image_path;
            }
        }

        $imagesJson = json_encode($images);
        $listing->listinggallery()->create([
            'image_path' => $imagesJson,
            'video_path'=>$validated['video'],

        ]);

        return response()->json(['message' => 'Listing,address and images stored successfully'], 201);

    }
}
