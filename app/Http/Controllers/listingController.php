<?php

namespace App\Http\Controllers;

use App\Http\Requests\listingRequest;
use App\Models\Addresses;
use App\Models\Area;
use App\Models\City;
use App\Models\Country;
use App\Models\Favorite;
use App\Models\Listings;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Services\ListingService;


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
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  type="object",
     *                  required={"listing_title", "description", "listing_type", "base_price", "price_mode", "address", "state", "city", "country", "zip-code", "images"},
     *                  @OA\Property(property="listing_title", type="string", example="Beautiful Apartment"),
     *                  @OA\Property(property="description", type="string", example="A beautiful apartment in the city center."),
     *                  @OA\Property(property="listing_type", type="string", example="Apartment"),
     *                  @OA\Property(property="base_price", type="integer", example=456),
     *                  @OA\Property(property="price_mode", type="string", example="per night"),
     *                  @OA\Property(property="is_instance", type="string", example="1"),
     *                  @OA\Property(property="listing_bedrooms", type="integer", example=2),
     *                  @OA\Property(property="guests", type="integer", example=4),
     *                  @OA\Property(property="beds", type="integer", example=2),
     *                  @OA\Property(property="baths", type="integer", example=1),
     *                  @OA\Property(property="listing_rooms", type="integer", example=3),
     *                  @OA\Property(property="listing_size", type="integer", example=1200),
     *                  @OA\Property(property="listing_size_unit", type="string", example="sqft"),
     *                  @OA\Property(property="affiliate_booking_link", type="string", example="https://example.com"),
     *                  @OA\Property(property="address", type="string", example="suny pul RYK"),
     *                  @OA\Property(property="state", type="string", example="Punjab"),
     *                  @OA\Property(property="city", type="string", example="RYK"),
     *                  @OA\Property(property="country", type="string", example="Pakistan"),
     *                  @OA\Property(property="area", type="string", example="suny pul"),
     *                  @OA\Property(property="zip-code", type="integer", example=12345),
     *                  @OA\Property(
     *                      property="images",
     *                      type="array",
     *                      @OA\Items(
     *                          type="string",
     *                          format="binary",
     *                          description="Image file for the listing"
     *                      ),
     *                      description="Array of images for the listing"
     *                  ),
     *                  @OA\Property(property="video", type="string", example="www.example.com"),
     *                  @OA\Property(property="virtual_tour", type="string", description="Enter virtual tour iframe/embedded code", example="<iframe src='...'></iframe>"),
     *                  @OA\Property(property="homeyfy_accomodation[0][acc_bedroom_name]", type="string", description="Name of the bedroom", example="Deluxe Room"),
     *                  @OA\Property(property="homeyfy_accomodation[0][acc_guests]", type="integer", description="Number of guests", example=2),
     *                  @OA\Property(property="homeyfy_accomodation[0][acc_no_of_beds]", type="integer", description="Number of beds", example=1),
     *                  @OA\Property(property="homeyfy_accomodation[0][acc_bedroom_type]", type="string", description="Type of bedroom", example="King"),
     *                  @OA\Property(
     *                               property="acc_bed_images",
     *                               type="array",
     *                               @OA\Items(
     *                                   type="string",
     *                                   format="binary",
     *                                   description="Image file of the bed"
     *                               ),
     *                               description="Array of images for the bed"
     *                   ),
     *                  @OA\Property(property="homeyfy_extra[0][name]", type="string", description="Name of price", example="my price"),
     *                  @OA\Property(property="homeyfy_extra[0][price]", type="integer", description="Total price", example=434),
     *                  @OA\Property(property="homeyfy_extra[0][type]", type="string", description="type of price", example="insany"),
     *                  @OA\Property(property="homeyfy_service[0][name]", type="string", description="Name of price", example="my price"),
     *                  @OA\Property(property="homeyfy_service[0][price]", type="integer", description="Total price", example=434),
     *                  @OA\Property(property="homeyfy_service[0][bed]", type="string", description="no of beds", example=3),
     *              )
     *          )
     *      ),
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
    public function __construct(protected ListingService $listingService) {}

    public function submit(ListingRequest $request)
    {
        try {
            $listing = $this->listingService->createListing($request->validated());

            return response()->json([
                'message' => 'Listing submitted successfully',
                'listing_id' => $listing->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong during listing submission',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function dashboard_view(Request $request)
    {
        $userId = $request->input('user_id');
        $userType = $request->input('user_type');
        $page = $request->input('page', 1);
        $pageSize = $request->input('pagesize', 10);
        $search = $request->input('search');
        $sortby = $request->input('sort');

        $listings = $this->listingService->getDashboardListings($userId, $userType, $page, $pageSize,$search,$sortby);

        return response()->json([
            'status' => true,
            'listings' => $listings
        ]);
    }
    public function edit(Request $request)
    {
        $listingId = $request->input('listing_id');

        if (!$listingId) {
            return response()->json(['message' => 'Listing ID is required'], 400);
        }

        $user = Auth::user();

        $listingData = $this->listingService->getListingDetailsForEdit($listingId, $user);

        if (!$listingData) {
            return response()->json(['message' => 'Listing not found or unauthorized'], 404);
        }

        return response()->json(['listings' => $listingData]);
    }

    public function search(Request $request)
    {
        $currentPage = $request->input('page');
        $pageSize = $request->input('pagesize');
        $search = $request->input('search');
        $sortby = $request->input('sort');

        $listings = $this->listingService->getSearchListings($currentPage, $pageSize, $search, $sortby);

        return response()->json([
            'status' => true,
            'listings' => $listings
        ]);
    }

    public function update(ListingRequest $request)
    {
        // Already validated by Form Request
        $validated = $request->validated();

        $user = Auth::user();

        $listing = $this->listingService->getListingForUpdate($request['listing_id'], $user);

        if (!$listing) {
            return response()->json(['message' => 'Listing not found'], 404);
        }

        // Update main listing table fields
        $listing->fill($validated);
        $listing->save();

        // Update related data
        $this->listingService->updatePrice($listing, $request);
        $this->listingService->updateGallery($listing, $request);
        $this->listingService->updateAddress($listing, $request);
        $this->listingService->updateBeds($listing, $request);
        $this->listingService->updateExtras($listing, $request);
        $this->listingService->updateServices($listing, $request);
        $this->listingService->updateFeatures($listing, $request);
        $this->listingService->updateTerms($listing, $request);

        return response()->json(['Message' => 'Listing updated successfully']);
    }



    public function updatea(Request $request )
    {

        $user = Auth::user();
        $listing_id =$request->input('listing_id');
        $user_id = $user->id;
        $user_type = $user->user_type;

        if($request->has('listing_id') && !empty($request->has('listing_id'))) {

            if($user_type == 'host'){
                $listings = Listings::with([
                    'addresses.country',
                    'addresses.state',
                    'addresses.city',
                    'addresses.area',
                    'listingGallery',
                    'beds',
                    'extra',
                    'services',
                    'feature',
                    'terms',
                    'price'
                ])->where('user_id',$user_id)->find($listing_id);
            } else if($user_type == 'admin'){
                $listings = Listings::with([
                    'addresses.country',
                    'addresses.state',
                    'addresses.city',
                    'addresses.area',
                    'listingGallery',
                    'beds',
                    'extra',
                    'services',
                    'feature',
                    'terms',
                    'price'
                ])->find($listing_id);
            }

        } else {
            return response()->json(['Message'=>'Go back listing not found'], 500);
        }

        if(!$listings){
            return response()->json(['Message'=>'Listing not found'], 400);
        }

        //**** Listing main table updation Started ****//

        if($request->has('listing_title') && !empty($request->input('listing_title'))){
            $listings->listing_title = $request->input('listing_title');
        }

        if($request->has('description') && !empty($request->input('description'))){
            $listings->description = $request->input('description');
        }


        if($request->has('listing_type') && !empty($request->input('listing_type'))){
            $listings->listing_type = $request->input('listing_type');
        }

        if($request->has('base_price') && !empty($request->input('base_price'))){
            $listings->base_price = $request->input('base_price');
        }

        if($request->has('price_mode') && !empty($request->input('price_mode'))){
            $listings->price_mode = $request->input('price_mode');
        }

        if($request->has('is_instance') && !empty($request->input('is_instance'))){
            $listings->is_instance = $request->input('is_instance');
        }

        //M.Sadiq new changes
        if($request->has('price_postfix') && !empty($request->input('price_postfix'))){
            $price = $listings->price->first();
            if($price){
                $price->price_postfix = $request->input('price_postfix');
                $price->save();
            } else {
                $listings->price()->create([
                    'price_postfix' => $request->input('price_postfix'),
                ]);
            }
        }
        
        if($request->has('weekends_price') && !empty($request->input('weekends_price'))){
            $price =$listings->price->first();
            if($price){
                $price->weekends_price = $request->input('weekends_price');
                $price->save();
            } else {
                $listings->price()->create([
                    'weekends_price' => $request->input('weekends_price'),
                ]);
            }
        }

        if($request->has('weekends_days') && !empty($request->input('weekends_days'))){
            $price =$listings->price->first();
            if($price){
                $price->weekends_days = $request->input('weekends_days');
                $price->save();
            } else {
                $listings->price()->create([
                    'weekends_days' => $request->input('weekends_days'),
                ]);
            }
        }

        if($request->has('priceWeek') && !empty($request->input('priceWeek'))){
            $price =$listings->price->first();
            if($price){
                $price->priceWeek = $request->input('priceWeek');
                $price->save();
            } else {
                $listings->price()->create([
                    'priceWeek' => $request->input('priceWeek'),
                ]);
            }
        }

        if($request->has('priceMonthly') && !empty($request->input('priceMonthly'))){
            $price =$listings->price->first();
            if($price){
                $price->priceMonthly = $request->input('priceMonthly');
                $price->save();
            } else {
                $listings->price()->create([
                    'priceMonthly' => $request->input('priceMonthly'),
                ]);
            }
        }
        if($request->has('allow_additional_guests') && !empty($request->input('allow_additional_guests'))){
            $price =$listings->price->first();
            if($price){
                $price->allow_additional_guests = $request->input('allow_additional_guests');
                $price->save();
            } else {
                $listings->price()->create([
                    'allow_additional_guests' => $request->input('allow_additional_guests'),
                ]);
            }
        }
        if($request->has('additional_guests_price') && !empty($request->input('additional_guests_price'))){
            $price =$listings->price->first();
            if($price){
                $price->additional_guests_price = $request->input('additional_guests_price');
                $price->save();
            } else {
                $listings->price()->create([
                    'additional_guests_price' => $request->input('additional_guests_price'),
                ]);
            }
        }
        if($request->has('num_additional_guests') && !empty($request->input('num_additional_guests'))){
            $price =$listings->price->first();
            if($price){
                $price->num_additional_guests = $request->input('num_additional_guests');
                $price->save();
            } else {
                $listings->price()->create([
                    'num_additional_guests' => $request->input('num_additional_guests'),
                ]);
            }
        }
        if($request->has('cleaning_fee') && !empty($request->input('cleaning_fee'))){
            $price =$listings->price->first();
            if($price){
                $price->cleaning_fee = $request->input('cleaning_fee');
                $price->save();
            } else {
                $listings->price()->create([
                    'cleaning_fee' => $request->input('cleaning_fee'),
                ]);
            }
        }
        if($request->has('cleaning_fee_type') && !empty($request->input('cleaning_fee_type'))){
            $price =$listings->price->first();
            if($price){
                $price->cleaning_fee_type = $request->input('cleaning_fee_type');
                $price->save();
            } else {
                $listings->price()->create([
                    'cleaning_fee_type' => $request->input('cleaning_fee_type'),
                ]);
            }
        }
        if($request->has('city_fee') && !empty($request->input('city_fee'))){
            $price =$listings->price->first();
            if($price){
                $price->city_fee = $request->input('city_fee');
                $price->save();
            } else {
                $listings->price()->create([
                    'city_fee' => $request->input('city_fee'),
                ]);
            }
        }
        if($request->has('city_fee_type') && !empty($request->input('city_fee_type'))){
            $price =$listings->price->first();
            if($price){
                $price->city_fee_type = $request->input('city_fee_type');
                $price->save();
            } else {
                $listings->price()->create([
                    'city_fee_type' => $request->input('city_fee_type'),
                ]);
            }
        }
        if($request->has('security_deposit') && !empty($request->input('security_deposit'))){
            $price =$listings->price->first();
            if($price){
                $price->security_deposit = $request->input('security_deposit');
                $price->save();
            } else {
                $listings->price()->create([
                    'security_deposit' => $request->input('security_deposit'),
                ]);
            }
        }

        //M.Sadiq new changes

        if($request->has('status') && !empty($request->input('status'))){
            $listings->status = $request->input('status');
        }

        if($request->has('listing_bedrooms') && !empty($request->input('listing_bedrooms'))){
            $listings->listing_bedrooms = $request->input('listing_bedrooms');
        }

        if($request->has('guests') && !empty($request->input('guests'))){
            $listings->guests = $request->input('guests');
        }
        if($request->has('l_beds') && !empty($request->input('l_beds'))){
            $listings->l_beds = $request->input('l_beds');
        }
        if($request->has('baths') && !empty($request->input('baths'))){
            $listings->baths= $request->input('baths');
        }
        if($request->has('listing_rooms') && !empty($request->input('listing_rooms'))){
            $listings->listing_rooms = $request->input('listing_rooms');
        }
        if($request->has('listing_size') && !empty($request->input('listing_size'))){
            $listings->listing_size = $request->input('listing_size');
        }
        if($request->has('listing_size_unit') && !empty($request->input('listing_size_unit'))){
            $listings->listing_size_unit = $request->input('listing_size_unit');
        }

        if($request->has('affiliate_booking_link') && !empty($request->input('affiliate_booking_link'))){
            $listings->affiliate_booking_link = $request->input('affiliate_booking_link');
        }

        if($request->has('virtual_tour') && !empty($request->input('virtual_tour'))){
            $listings->virtual_tour = $request->input('virtual_tour');
        }

        if($request->has('contact_info') && !empty($request->input('contact_info'))){
            $listings->contact_info = $request->input('contact_info');
        }
        if($request->has('private_note') && !empty($request->input('private_note'))){
            $listings->private_note = $request->input('private_note');
        }

        if($request->has('is_feature') && !empty($request->input('is_feature'))){
            $listings->is_feature = $request->input('is_feature');
        }

        if($request->has('view_login') && !empty($request->input('view_login'))){
            $listings->view_login = $request->input('view_login');
        }

        $listing_images = [];

        if ($request->filled('images') && !empty($request->input('images'))) {
            $images = $request->input('images');

            if (is_string($images)) {
                $images = json_decode($images, true); // decode to array
            }

            if (is_array($images)) {
                foreach ($images as $imageUrl) {
                    $listing_images[] = $imageUrl;
                }
            }
        }

        $media_listing = $listings->listinggallery()->first();

        if ($media_listing) {
            $media_listing->image_path = json_encode($listing_images); // save as JSON
            $media_listing->save();
        }

        
        if($request->has('featured_image') && !empty($request->input('featured_image'))){
            $media_listing = $listings->listinggallery()->first();
            if($media_listing){
                $media_listing->main_image = $request->input('featured_image');
                $media_listing->save();
            }
        }
        if($request->has('video') && !empty($request->input('video'))){
            $media_listing = $listings->listinggallery()->first();
            if($media_listing){
                $media_listing->video_path = $request->input('video');
                $media_listing->save();
            }
        }
        //**** Listing main table update completed ****//

        //**** Listing address table update Start ****//

        if($request->has('map_address') && !empty($request->input('map_address')) ){
            $address =$listings->addresses->first();
            if($address){
                $address->address = $request->input('map_address');
                $address->save();
            }

        }
        if($request->has('zipCode') && !empty($request->input('zipCode')) ){
            $address =$listings->addresses->first();
            if($address){
                $address->zip_code = $request->input('zipCode');
                $address->save();
            }
        }
        if($request->has('latitude') && !empty($request->input('latitude')) ){
            $address =$listings->addresses->first();
            if($address){
                $address->lat = $request->input('latitude');
                $address->save();
            }
        }
        
        if($request->has('longitude') && !empty($request->input('longitude')) ){
            $address =$listings->addresses->first();
            if($address){
                $address->long = $request->input('longitude');
                $address->save();
            }
        }
        if($request->has('state') && !empty($request->input('state')) ){
            $state = $listings->addresses->first()->state;
            if($state){
                $state->name = $request->input('state');
                $state->save();
            }
        }
        if($request->has('city') && !empty($request->input('city')) ){
            $city = $listings->addresses->first()->city;
            if($city){
                $city->name = $request->input('city');
                $city->save();
            }
        }
        if($request->has('country') && !empty($request->input('country')) ){
            $country = $listings->addresses->first()->country;
            if($country){
                $country->name = $request->input('country');
                $country->save();
            }
        }
        if($request->has('area') && !empty($request->input('area')) ){
            $area = $listings->addresses->first()->area;
            if($area){
                $area->name = $request->input('area');
                $area->save();
            }
        }
        //**** Listing address table update Completed ****//

        //**** Listing beds table update start ****//

        if($request->has('homeyfy_accomodation') && !empty($request->input('homeyfy_accomodation'))){
            $bedroomNames = $guests = $acc_no_of_beds = $acc_bedroom_type = [];
            $bedImages = [];
            $homeyfy_accomodation = $request->input('homeyfy_accomodation');
            foreach ($homeyfy_accomodation as $index => $accomodation){
                $uploadedImages = [];
                $bedroomNames[] = $accomodation['acc_bedroom_name'];
                $guests [] = $accomodation['acc_guests'];
                $acc_no_of_beds [] = $accomodation['acc_no_of_beds'];
                $acc_bedroom_type [] = $accomodation['acc_bedroom_type'];
                if($request->hasFile("homeyfy_accomodation.$index.acc_bed_images")){
                    foreach ($request->file("homeyfy_accomodation.$index.acc_bed_images") as $images){
                        $image_name = time().rand(99,9999). '.'. $images->getClientOriginalName();
                        $path = Storage::putFileAs('public/images',$images,$image_name);
                        $uploadedImages[] = $path;
                    }
                }
                $bedImages[] = $uploadedImages;
            }

            $beds = $listings->beds->first();
            if($beds){
                if($bedroomNames){
                    $beds->name = $bedroomNames;
                }
                if($guests){
                    $beds->guests = $guests;
                }
                if($acc_no_of_beds){
                    $beds->beds = $acc_no_of_beds;
                }
                if($acc_bedroom_type){
                    $beds->type = $acc_bedroom_type;
                }
                $beds->save();
            }


            if($bedImages){
               $media_beds = $beds->bedgallery()->first();
               if($media_beds)
               {
                   $media_beds->image_path = $bedImages;
                   $media_beds->save();
               }
            }
        }

        //**** Listing beds table update Completed ****//

        //**** Listing Extra table update start ****//

        $extra = $request->input('extra');
        $name = $price = $type = [];
        if(!empty($extra) && $request->has('extra')){
            foreach ($extra as $data){
                $name [] = $data['name'];
                $price [] = $data['price'];
                $type [] = $data['type'];
            }
        }

        $extras = $listings->extra->first();
        if($extras){
            if($name){
                $extras->name = $name;
            }
            if($price){
                $extras->price = $price;
            }
            if($type){
                $extras->type = $type;
            }
            $extras->save();
        }
        //**** Listing Extra table update Completed ****//

        //**** Listing service table update start ****//

        $service = $request->input('homeyfy_services');
        $name = $price = $bed = [];
        if(!empty($service) && $request->has('homeyfy_services')){
            foreach ($service as $data){
                $name [] = $data['name'];
                $price [] = $data['price'];
                $bed [] = $data['bed'];
            }
        }

        $services = $listings->services->first();
        if($services){
            if($name){
                $services->name = $name;
            }
            if($price){
                $services->price = $price;
            }
            if($bed){
                $services->bed = $bed;
            }
            $services->save();
        }

        //**** Listing service table update Completed ****//

        //**** Listing feature table update Start ****//

        if($request->has('amenities') && !empty($request->input('amenities'))){
            $feature = $listings->feature->first();
            if($feature){
                $feature->amenities = $request->input('amenities');
            }
            $feature->save();
        }
        if($request->has('facilities') && !empty($request->input('facilities'))){
            $feature = $listings->feature->first();
            if($feature){
                $feature->facilities = $request->input('facilities');
            }
            $feature->save();
        }

        //**** Listing feature table update Completed ****//

        //**** Listing Term table update Start ****//

        $term = $listings->terms->first();
        if($term){
            if($request->has('cancellation_policy') && !empty($request->input('cancellation_policy'))){
                $term->cancellation_policy = $request->input('cancellation_policy');
            }
            if($request->has('min_book_hours') && !empty($request->input('min_book_hours'))){
                $term->min_book_hours = $request->input('min_book_hours');
            }
            if($request->has('min_book_weeks') && !empty($request->input('min_book_weeks'))){
                $term->min_book_weeks = $request->input('min_book_weeks');
            }
            if($request->has('max_book_weeks') && !empty($request->input('max_book_weeks'))){
                $term->max_book_weeks = $request->input('max_book_weeks');
            }
            if($request->has('min_book_months') && !empty($request->input('min_book_months'))){
                $term->min_book_months = $request->input('min_book_months');
            }
            if($request->has('max_book_months') && !empty($request->input('max_book_months'))){
                $term->max_book_months = $request->input('max_book_months');
            }
            if($request->has('min_book_days') && !empty($request->input('min_book_days'))){
                $term->min_book_days = $request->input('min_book_days');
            }
            if($request->has('max_book_days') && !empty($request->input('max_book_days'))){
                $term->max_book_days = $request->input('max_book_days');
            }
            if($request->has('start_hour') && !empty($request->input('start_hour'))){
                $term->start_hour = $request->input('start_hour');
            }
            if($request->has('end_hour') && !empty($request->input('end_hour'))){
                $term->end_hour = $request->input('end_hour');
            }
            if($request->has('checkin_after') && !empty($request->input('checkin_after'))){
                $term->checkin_after = $request->input('checkin_after');
            }
            if($request->has('checkout_before') && !empty($request->input('checkout_before'))){
                $term->checkout_before = $request->input('checkout_before');
            }
            if($request->has('smoke') && !empty($request->input('smoke'))){
                $term->smoke = $request->input('smoke');
            }
            if($request->has('pets') && !empty($request->input('pets'))){
                $term->pets = $request->input('pets');
            }
            if($request->has('party') && !empty($request->input('party'))){
                $term->party = $request->input('party');
            }
            if($request->has('children') && !empty($request->input('children'))){
                $term->children = $request->input('children');
            }
            if($request->has('additional_rules') && !empty($request->input('additional_rules'))){
                $term->additional_rules = $request->input('additional_rules');
            }
            if($request->has('child') && !empty($request->input('child'))){
                $term->child = $request->input('child');
            }
            $term->save();
        }


        $listings_update =  $listings->save();

        if($listings_update){
            return response()->json(['Message'=>'Listing update successfully']);
        }

    }

    public function delete(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $user_type = $user->user_type;

        if ($request->has('listing_id') && !empty($request->input('listing_id'))) {
            $listing_id = $request->input('listing_id');

            $listings = Listings::with([
                'addresses.country',
                'addresses.state',
                'addresses.city',
                'addresses.area',
                'listingGallery',
                'beds',
                'extra',
                'services',
                'feature',
                'terms'
            ]);

            // Get the listing based on user type
            if ($user_type == 'host') {
                $listings = $listings->where('user_id', $user_id)->find($listing_id);
            } else if ($user_type == 'admin') {
                $listings = $listings->find($listing_id);
            }

            if ($listings) {
                // Soft delete the listing and all related records
                $listings->addresses()->each(function ($address) {
                    $address->country()->delete();
                    $address->state()->delete();
                    $address->city()->delete();
                    $address->area()->delete();
                    $address->delete(); // Soft delete the address itself
                });

               $beds= $listings->beds()->first();
                if($beds){
                    $bed_gallery = $beds->bedgallery()->first();
                    if($bed_gallery){
                        $bed_gallery->delete();
                    }
                    $beds->delete();
                }

                $listings->listingGallery()->delete(); // Soft delete related galleries
                $listings->extra()->delete(); // Soft delete related extras
                $listings->services()->delete(); // Soft delete related services
                $listings->feature()->delete(); // Soft delete related features
                $listings->terms()->delete(); // Soft delete related terms

                $listings->delete(); // Soft delete the main listing

                return response()->json(['Message' => 'Listing and related records soft deleted successfully'], 200);
            } else {
                return response()->json(['Message' => 'Listing not found'], 404);
            }
        } else {
            return response()->json(['Message' => 'Invalid request, listing ID is missing'], 400);
        }
    }
    public function favorite_listings(Request $request)
    {
      $user_id    = $request->input('user_id');
      $listing_id = $request->input('listing_id');
      $favorite = Favorite::where('user_id',$user_id)->where('listing_id',$listing_id)->first();
      if ($favorite) {
          $favorite->delete();
          return response()->json(['Added'=>false]);
      } else {
          Favorite::create([
              'user_id'=> $user_id,
              'listing_id'=>$listing_id
          ]);
          return response()->json(['Added'=>true]);
      }

    }

    public function getFavorite(Request $request)
    {
        $user_id = $request->input('user_id');
        $favorite_seleted= Favorite::where('user_id',$user_id)->get();
        return response()->json($favorite_seleted);
    }

    public function images(Request $request)
    {
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('public/uploads', $filename);

            $url = asset('storage/uploads/' . $filename); // Return the full URL of the uploaded image

            return response()->json(['imageUrl' => $url]);
        }

        return response()->json(['message' => 'No image found'], 400);
    }
    public function removeImage(Request $request)
    {
        $imagePath = $request->input('image_path');
        $imageRelativePath = str_replace(url('/storage') . '/', '', $imagePath);
        if(Storage::disk('public')->exists($imageRelativePath)){
            Storage::disk('public')->delete($imageRelativePath);
            return response()->json([
                'status' => 'success',
                'msg' => 'Image removed successfully from storage',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'msg' => 'Image not found',
            ], 404);
        }
    }


}
