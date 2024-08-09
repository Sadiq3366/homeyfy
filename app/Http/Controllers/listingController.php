<?php

namespace App\Http\Controllers;

use App\Http\Requests\listingRequest;
use App\Models\Addresses;
use App\Models\Area;
use App\Models\City;
use App\Models\Country;
use App\Models\Listings;
use App\Models\State;
use App\Models\User;
use Illuminate\Http\Request;
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
            'l_beds' => $validated['l_beds'],
            'baths' => $validated['baths'],
            'listing_rooms' => $validated['listing_rooms'],
            'listing_size' => $validated['listing_size'],
            'listing_size_unit' => $validated['listing_size_unit'],
            'affiliate_booking_link' => $validated['affiliate_booking_link'],
            'virtual_tour' => $validated['virtual_tour'],
        ]);

        // Create the Address record
        $listing->addresses()->create([
            'address' => $validated['address'],
            'zip_code'=>$validated['zip_code'],
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

        $accommodations = $request->input('homeyfy_accomodation');
        $bedroomNames = $guests = $acc_no_of_beds = $acc_bedroom_type =[];
        $bedImages = [];
        if($accommodations){
            foreach ($accommodations as $index =>$accommodation) {
                $uploadedImages = [];
                $bedroomNames[] = $accommodation['acc_bedroom_name'];
                $guests[] = $accommodation['acc_guests'];
                $acc_no_of_beds[] = $accommodation['acc_no_of_beds'];
                $acc_bedroom_type[] = $accommodation['acc_bedroom_type'];
                if ($request->hasFile("homeyfy_accomodation.$index.acc_bed_images")) {
                    foreach ($request->file("homeyfy_accomodation.$index.acc_bed_images") as $file) {
                        $file_name = time().rand(99,9999).'.'.$file->getClientOriginalName();
                        $path = Storage::putFileAs('public/images',$file,$file_name);
                        $uploadedImages[]= $path;
                    }
                }
                $bedImages[]=$uploadedImages;
            }

            $bed = $listing->beds()->create([
                'listing_id' => $listing->id,
                'name' => json_encode($bedroomNames), // Convert array to JSON
                'guests' => json_encode($guests), // Convert array to JSON
                'beds' => json_encode($acc_no_of_beds), // Convert array to JSON
                'type' => json_encode($acc_bedroom_type), // Convert array to JSON
            ]);

            $imagesJson = json_encode($bedImages);

            $bed->bedgallery()->create([
                'image_path' => $imagesJson,
            ]);
        }
        $ex_name = $ex_price = $ex_type =[];
        if($validated['homeyfy_extra']){
            foreach ($validated['homeyfy_extra'] as $index=>$extra){
                $ex_name []= $extra['name'];
                $ex_price []= $extra['price'];
                $ex_type []= $extra['type'];
            }
        }

        $listing->extra()->create([
            'listing_id'=> $listing->id,
            'name'=> json_encode($ex_name),
            'price'=>json_encode($ex_price),
            'type'=>json_encode($ex_type),
        ]);

        $ser_name = $ser_price = $ser_type =[];
        if($validated['homeyfy_services']){
            foreach ($validated['homeyfy_services'] as $index=>$services){
                $ser_name []= $services['name'];
                $ser_price []= $services['price'];
                $ser_type []= $services['bed'];
            }
        }

        $listing->services()->create([
            'listing_id'=> $listing->id,
            'name'=> json_encode($ser_name),
            'price'=>json_encode($ser_price),
            'bed'=>json_encode($ser_type),
        ]);

        $listing->feature()->create([
            'listing_id'=> $listing->id,
            'amenities'=> json_encode($request['amenities']),
            'facilities'=>json_encode($request['facilities']),
        ]);

        $listing->terms()->create([
            'listing_id'=> $listing->id,
            'cancellation_policy'=> $request['cancellation_policy'],
            'min_book_hours'=>$request['min_book_hours'],
            'min_book_weeks'=> $request['min_book_weeks'],
            'max_book_weeks'=>$request['max_book_weeks'],
            'min_book_months'=> $request['min_book_months'],
            'max_book_months'=>$request['max_book_months'],
            'min_book_days'=> $request['min_book_days'],
            'max_book_days'=>$request['max_book_days'],
            'start_hour'=>$request['start_hour'],
            'end_hour'=>$request['end_hour'],
            'checkin_after'=>$request['checkin_after'],
            'checkout_before'=>$request['checkout_before'],
            'smoke'=>$request['smoke'],
            'pets'=>$request['pets'],
            'party'=>$request['party'],
            'children'=>$request['children'],
            'child'=>$request['child'],
            'additional_rules'=>$request['additional_rules'],
        ]);

        return response()->json(['message' => 'Listing,address,images and beds stored successfully'], 201);

    }
    public function view(Request $request )
    {

        $id = Auth::id();
        $user = Auth::user();
        $user_type = $user->user_type;
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
        if ($user_type == 'host') {
            $listings->where('user_id', $id);
        }

        if($request->has('listing_search')){
            $searchKeyword = $request->query('listing_search');

            $listings->where(function ($query) use ($searchKeyword){
                $query->where('listing_title', 'like', '%' . $searchKeyword . '%')->orWhere('id', 'like', '%' . $searchKeyword . '%')
                ->orWhere('description', 'like', '%' . $searchKeyword . '%')->orWhere('base_price', 'like', '%' . $searchKeyword . '%')
                ->orWhere('status', 'like', '%' . $searchKeyword . '%')->orWhere('listing_bedrooms', 'like', '%' . $searchKeyword . '%')
                    ->orWhere('guests', 'like', '%' . $searchKeyword . '%')->orWhere('l_beds', 'like', '%' . $searchKeyword . '%')->orWhere('baths', 'like', '%' . $searchKeyword . '%')
                    ->orWhere('listing_rooms', 'like', '%' . $searchKeyword . '%');

            });
        }

        $listings = $listings->get();
        $listings_data=[];

        foreach ($listings as $listing) {
            $listings_data ['ID'] = $listing->id;
            $listings_data ['Title'] = $listing->listing_title;
            $listings_data ['Description'] = $listing->description;
            $listings_data ['host_id'] = $listing->user_id;
            $listings_data ['listing_type'] = $listing->listing_type;
            $listings_data ['price_mode'] = $listing->price_mode;
            $listings_data ['is_instance'] = $listing->is_instance;
            $listings_data ['status'] = $listing->status;
            $listings_data ['base_price'] = $listing->base_price;
            $listings_data ['lsiting_bedroom'] = $listing->listing_bedrooms;
            $listings_data ['guests'] = $listing->guests;
            $listings_data ['l_beds'] = $listing->l_beds;
            $listings_data ['baths'] = $listing->baths;
            $listings_data ['listing_size'] = $listing->listing_size;
            $listings_data ['listing_size_unit'] = $listing->listing_size_unit;
            $listings_data ['affiliate_booking_link'] = $listing->affiliate_booking_link;
            $listings_data ['virtual_tour'] = $listing->virtual_tour;
            $listings_data ['listing_rooms'] = $listing->listing_rooms;

            // Access addresses
            if($listing->addresses->isNotEmpty()){
                foreach ($listing->addresses as $address) {
                    $listings_data['address'] = $address->address;
                    $listings_data['state'] = $address->state->name ?? null;
                    $listings_data['city'] = $address->city->name ?? null;
                    $listings_data['country'] = $address->country->name ?? null;
                    $listings_data['area'] = $address->area->name ?? null;
                }
            }
            // Access listing gallery
            if($listing->listingGallery->isNotEmpty()){
                foreach ($listing->listingGallery as $gallery) {
                    $listings_data ['image_path'] = $gallery->image_path;
                    $listings_data ['video_path'] = $gallery->video_path;
                }
            }

            // Access beds
            if($listing->beds->isNotEmpty()){
                foreach ($listing->beds as $bed) {
                    $listings_data ['name'] = $bed->name;
                    $listings_data ['guests'] = $bed->guests;
                    $listings_data ['beds'] = $bed->beds;
                    $listings_data ['type'] = $bed->type;
                }
            }


            // Access extras
            if($listing->extra->isNotEmpty()){
                foreach ($listing->extra as $extra) {
                    $listings_data ['name'] = $extra->name;
                    $listings_data ['price'] = $extra->price;
                    $listings_data ['type'] = $extra->type;
                }
            }
            // Access services
            if($listing->services->isNotEmpty()){
                foreach ($listing->services as $service) {
                    $listings_data ['name'] = $service->name;
                    $listings_data ['price'] = $service->price;
                    $listings_data ['bed'] = $service->bed;
                }
            }
            // Access features
            if($listing->feature->isNotEmpty()){
                foreach ($listing->feature as $feature) {
                    $listings_data ['amenities'] = $feature->amenities;
                    $listings_data ['facilities'] = $feature->facilities;
                }
            }

            // Access terms
            if($listing->terms->isNotEmpty()){
                foreach ($listing->terms as $term) {
                    $listings_data ['cancellation_policy'] = $term->cancellation_policy;
                    $listings_data ['min_book_hours'] = $term->min_book_hours;
                    $listings_data ['min_book_weeks'] = $term->min_book_weeks;
                    $listings_data ['max_book_weeks'] = $term->max_book_weeks;
                    $listings_data ['min_book_months'] = $term->min_book_months;
                    $listings_data ['max_book_months'] = $term->max_book_months;
                    $listings_data ['min_book_days'] = $term->min_book_days;
                    $listings_data ['max_book_days'] = $term->max_book_days;
                    $listings_data ['start_hour'] = $term->start_hour;
                    $listings_data ['end_hour'] = $term->end_hour;
                    $listings_data ['checkin_after'] = $term->checkin_after;
                    $listings_data ['checkout_before'] = $term->checkout_before;
                    $listings_data ['smoke'] = $term->smoke;
                    $listings_data ['pets'] = $term->pets;
                    $listings_data ['party'] = $term->party;
                    $listings_data ['children'] = $term->children;
                    $listings_data ['additional_rules'] = $term->additional_rules;
                }
            }
            print_r($listings_data);
        }
    }

    public function search(Request $request )
    {

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

        if($request->has('listing_title') && !empty($request->input('listing_title'))){
            $listings->where('listing_title','like',$request->query('listing_title'));
        }

        if($request->has('has_featured') && !empty($request->input('has_featured'))){
            $listings->where('featured','like','1');
        }

        $beds = '>=';

        if($request->has('beds') && !empty($request->input('beds'))){
            $listings->where('l_beds',$beds ,$request->query('beds'));
        }

        $guest = '>=';

        if($request->has('guests') && !empty($request->input('guests'))){
            $listings->where('guests', $guest ,$request->query('guests'));
        }

        $bedrooms = '=';

        if($request->has('bedrooms') && !empty($request->input('bedrooms'))){
            $listings->where('listing_bedrooms',$bedrooms ,$request->query('bedrooms'));
        }

        $baths = '>=';

        if($request->has('baths') && !empty($request->input('baths'))){
            $listings->where('baths', $baths ,$request->query('baths'));
        }

        $rooms = '>=';

        if($request->has('rooms') && !empty($request->input('rooms'))){
            $listings->where('listing_rooms', $rooms ,$request->query('rooms'));
        }


        if($request->has('address') && !empty($request->input('address'))){
            $address = $request->query('address');
            $listings->whereHas('addresses',function ($query) use ($address){
                $query->where('address','like',$address);
            });
        }

        if($request->has('area') && !empty($request->input('area'))){
            $area = $request->query('area');
            $listings->whereHas('addresses.area', function ($query) use ($area){
               $query->where('name','like',$area);
            });
        }
        if($request->has('city') && !empty($request->input('city'))){
            $city = $request->query('city');
            $listings->whereHas('addresses.city', function ($query) use ($city){
                $query->where('name','like',$city);
            });
        }
        if($request->has('country') && !empty($request->input('country'))){
            $country = $request->query('country');
            $listings->whereHas('addresses.country', function ($query) use ($country){
                $query->where('name','like',$country);
            });
        }
        if($request->has('state') && !empty($request->input('state'))){
            $state = $request->query('state');
            $listings->whereHas('addresses.state', function ($query) use ($state){
                $query->where('name','like',$state);
            });
        }

        if($request->has('smoke') && !empty($request->input('smoke'))){
            $smoke = $request->query('smoke');
            $listings->whereHas('terms', function ($query) use ($smoke){
                $query->where('smoke','like',$smoke);
            });
        }
        if($request->has('pets') && !empty($request->input('pets'))){
            $pets = $request->query('pets');
            $listings->whereHas('terms', function ($query) use ($pets){
                $query->where('pets','like',$pets);
            });
        }

        if($request->has('party') && !empty($request->input('party'))){
            $party = $request->query('party');
            $listings->whereHas('terms', function ($query) use ($party){
                $query->where('party','like',$party);
            });
        }

        if($request->has('child') && !empty($request->input('child')) && $request->query('child') !=0 ){
            $child = $request->query('child');
            $listings->whereHas('terms', function ($query) use ($child){
                $query->where('child','like',$child);
            });
        }

        $order_child = '>=';

        if($request->has('children') && !empty($request->input('children')) ){
            $children = $request->query('children');
            $listings->whereHas('terms', function ($query) use ($children, $order_child){
                $query->where('children', $order_child ,$children);
            });
        }
        $listings_search = $listings->get();

        $listings_data=[];

        foreach ($listings_search as $listing) {
            $listings_data ['ID'] = $listing->id;
            $listings_data ['Title'] = $listing->listing_title;
            $listings_data ['Description'] = $listing->description;
            $listings_data ['host_id'] = $listing->user_id;
            $listings_data ['listing_type'] = $listing->listing_type;
            $listings_data ['price_mode'] = $listing->price_mode;
            $listings_data ['is_instance'] = $listing->is_instance;
            $listings_data ['status'] = $listing->status;
            $listings_data ['base_price'] = $listing->base_price;
            $listings_data ['lsiting_bedroom'] = $listing->listing_bedrooms;
            $listings_data ['guests'] = $listing->guests;
            $listings_data ['l_beds'] = $listing->l_beds;
            $listings_data ['baths'] = $listing->baths;
            $listings_data ['listing_size'] = $listing->listing_size;
            $listings_data ['listing_size_unit'] = $listing->listing_size_unit;
            $listings_data ['affiliate_booking_link'] = $listing->affiliate_booking_link;
            $listings_data ['virtual_tour'] = $listing->virtual_tour;
            $listings_data ['listing_rooms'] = $listing->listing_rooms;

            // Access addresses
            if($listing->addresses->isNotEmpty()){
                foreach ($listing->addresses as $address) {
                    $listings_data['address'] = $address->address;
                    $listings_data['state'] = $address->state->name ?? null;
                    $listings_data['city'] = $address->city->name ?? null;
                    $listings_data['country'] = $address->country->name ?? null;
                    $listings_data['area'] = $address->area->name ?? null;
                }
            }
            // Access listing gallery
            if($listing->listingGallery->isNotEmpty()){
                foreach ($listing->listingGallery as $gallery) {
                    $listings_data ['image_path'] = $gallery->image_path;
                    $listings_data ['video_path'] = $gallery->video_path;
                }
            }

            // Access beds
            if($listing->beds->isNotEmpty()){
                foreach ($listing->beds as $bed) {
                    $listings_data ['name'] = $bed->name;
                    $listings_data ['guests'] = $bed->guests;
                    $listings_data ['beds'] = $bed->beds;
                    $listings_data ['type'] = $bed->type;
                }
            }


            // Access extras
            if($listing->extra->isNotEmpty()){
                foreach ($listing->extra as $extra) {
                    $listings_data ['name'] = $extra->name;
                    $listings_data ['price'] = $extra->price;
                    $listings_data ['type'] = $extra->type;
                }
            }
            // Access services
            if($listing->services->isNotEmpty()){
                foreach ($listing->services as $service) {
                    $listings_data ['name'] = $service->name;
                    $listings_data ['price'] = $service->price;
                    $listings_data ['bed'] = $service->bed;
                }
            }
            // Access features
            if($listing->feature->isNotEmpty()){
                foreach ($listing->feature as $feature) {
                    $listings_data ['amenities'] = $feature->amenities;
                    $listings_data ['facilities'] = $feature->facilities;
                }
            }

            // Access terms
            if($listing->terms->isNotEmpty()){
                foreach ($listing->terms as $term) {
                    $listings_data ['cancellation_policy'] = $term->cancellation_policy;
                    $listings_data ['min_book_hours'] = $term->min_book_hours;
                    $listings_data ['min_book_weeks'] = $term->min_book_weeks;
                    $listings_data ['max_book_weeks'] = $term->max_book_weeks;
                    $listings_data ['min_book_months'] = $term->min_book_months;
                    $listings_data ['max_book_months'] = $term->max_book_months;
                    $listings_data ['min_book_days'] = $term->min_book_days;
                    $listings_data ['max_book_days'] = $term->max_book_days;
                    $listings_data ['start_hour'] = $term->start_hour;
                    $listings_data ['end_hour'] = $term->end_hour;
                    $listings_data ['checkin_after'] = $term->checkin_after;
                    $listings_data ['checkout_before'] = $term->checkout_before;
                    $listings_data ['smoke'] = $term->smoke;
                    $listings_data ['pets'] = $term->pets;
                    $listings_data ['party'] = $term->party;
                    $listings_data ['children'] = $term->children;
                    $listings_data ['additional_rules'] = $term->additional_rules;
                }
            }
            print_r($listings_data);
        }
    }

    public function update(Request $request )
    {

        $user = Auth::user();
        $user_id = $user->id;
        $user_type = $user->user_type;

        if($request->has('listing_id') && !empty($request->has('listing_id'))) {
            $listing_id =$request->input('listing_id');
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
                    'terms'
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
                    'terms'
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
        $listing_images = [];
        if($request->hasFile('images')){
            foreach ($request->file('images') as $index => $images){
               $name = time().rand(99,9999).'.'.$images->getClientOriginalName();
               $path = Storage::putFileAs('public/images',$images,$name);
               $listing_images[] = $path;
            }
        }

        $media_listing = $listings->listinggallery()->first();
        if($media_listing){
            $media_listing->image_path = $listing_images;
            $media_listing->save();
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

        if($request->has('address') && !empty($request->input('address')) ){
            $address =$listings->addresses->first();
            if($address){
                $address->address = $request->input('address');
                $address->save();
            }

        }
        if($request->has('zip_code') && !empty($request->input('zip_code')) ){
            $address =$listings->addresses->first();
            if($address){
                $address->zip_code = $request->input('zip_code');
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

        $extra = $request->input('homeyfy_extra');
        $name = $price = $type = [];
        if(!empty($extra) && $request->has('homeyfy_extra')){
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

}
