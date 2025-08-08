<?php

namespace App\Services;

use App\Models\Listings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ListingService
{
    public function createListing(array $data)
    {
        return DB::transaction(function () use ($data) {
            // 1. Create main listing
            $listing = Listings::create([
                'listing_title' => $data['listing_title'],
                'description' => $data['description'],
                'user_id' => Auth::id(),
                'listing_type' => $data['listing_type'],
                'base_price' => $data['base_price'],
                'price_mode' => '',
                'is_instance' => $data['is_instance'],
                'status' => 'publish',
                'listing_bedrooms' => $data['listing_bedrooms'] ?? '',
                'guests' => $data['guests'] ?? '',
                'l_beds' => $data['l_beds'] ?? '',
                'baths' => $data['baths'] ?? '',
                'listing_rooms' => $data['listing_rooms'] ?? '',
                'listing_size' => $data['listing_size'] ?? '',
                'listing_size_unit' => $data['listing_size_unit'] ?? '',
                'affiliate_booking_link' => $data['affiliate_booking_link'] ?? '',
                'virtual_tour' => $data['virtual_tour'] ?? '',
                'contact_info'=> $data['contact_info'] ?? '',
                'private_note'=> $data['private_note'] ?? '',
                'is_feature'=> $data['is_feature'] ?? 'no',
                'view_login'=> $data['view_login'] ?? 'no',
            ]);

            // 2. Delegate price, location, gallery, etc. to separate private methods
            $this->handlePrice($listing, $data);
            $this->handleLocation($listing, $data);
            $this->handleGallery($listing, $data);
            $this->handleBeds($listing, $data);
            $this->handleExtra($listing, $data);
            $this->handleFeature($listing, $data);
            $this->handleTerms($listing, $data);

            return $listing;
        });
    }

    private function handlePrice($listing, $data)
    {
        $priceData = collect([
            'price_postfix', 'weekends_price', 'weekends_days', 'priceWeek',
            'priceMonthly', 'allow_additional_guests', 'additional_guests_price',
            'num_additional_guests', 'cleaning_fee', 'cleaning_fee_type',
            'city_fee', 'city_fee_type', 'security_deposit'
        ])->filter(fn($key) => isset($data[$key]))
          ->mapWithKeys(fn($key) => [$key => $data[$key]])
          ->toArray();

        if (!empty($priceData)) {
            $listing->price()->create($priceData);
        }
    }

    private function handleLocation($listing, $data)
    {
        $state = $data['state'] ? \App\Models\State::firstOrCreate(['name' => $data['state']]) : null;
        $city = $data['city'] ? \App\Models\City::firstOrCreate(['name' => $data['city'], 'state_id' => $state?->id]) : null;
        $country = $data['country'] ? \App\Models\Country::firstOrCreate(['name' => $data['country']]) : null;
        $area = $data['area'] ? \App\Models\Area::firstOrCreate(['name' => $data['area'], 'city_id' => $city?->id]) : null;

        $listing->addresses()->create([
            'address' => $data['map_address'],
            'zip_code' => $data['zipCode'],
            'state_id' => $state?->id,
            'city_id' => $city?->id,
            'country_id' => $country?->id,
            'area_id' => $area?->id,
            'lat' => $data['latitude'],
            'long' => $data['longitude'],
        ]);
    }

    private function handleGallery($listing, $data)
    {
        $images = is_string($data['images']) ? json_decode($data['images'], true) : $data['images'];
        
        $listing->listinggallery()->create([
            'image_path' => json_encode($images ?? []),
            'main_image' => $data['featured_image'] ?? '',
            'video_path' => $data['video'] ?? '',
        ]);
    }

    private function handleBeds($listing, $data)
    {
        if (!isset($data['homeyfy_accomodation'])) return;

        $bedroomNames = $guests = $acc_no_of_beds = $acc_bedroom_type = $bedImages = [];

        foreach ($data['homeyfy_accomodation'] as $accommodation) {
            $bedroomNames[] = $accommodation['acc_bedroom_name'];
            $guests[] = $accommodation['acc_guests'];
            $acc_no_of_beds[] = $accommodation['acc_no_of_beds'];
            $acc_bedroom_type[] = $accommodation['acc_bedroom_type'];
            $bedImages[] = $accommodation['acc_bed_images'] ?? [];
        }

        $bed = $listing->beds()->create([
            'listing_id' => $listing->id,
            'name' => json_encode($bedroomNames),
            'guests' => json_encode($guests),
            'beds' => json_encode($acc_no_of_beds),
            'type' => json_encode($acc_bedroom_type),
        ]);

        $bed->bedgallery()->create([
            'image_path' => json_encode($bedImages),
        ]);
    }

    private function handleExtra($listing, $data)
    {
        $extra = $data['extra'] ?? [];

        $ex_name = $ex_price = $ex_type = [];

        foreach ($extra as $item) {
            $ex_name[] = $item['name'];
            $ex_price[] = $item['price'];
            $ex_type[] = $item['type'];
        }

        $listing->extra()->create([
            'listing_id' => $listing->id,
            'name' => json_encode($ex_name),
            'price' => json_encode($ex_price),
            'type' => json_encode($ex_type),
        ]);
    }

    private function handleFeature($listing, $data)
    {
        $listing->feature()->create([
            'listing_id' => $listing->id,
            'amenities' => json_encode($data['amenities'] ?? []),
            'facilities' => json_encode($data['facilities'] ?? []),
        ]);
    }

    private function handleTerms($listing, $data)
    {
        $listing->terms()->create([
            'listing_id' => $listing->id,
            'cancellation_policy' => $data['cancellation_policy'] ?? '',
            'min_book_hours' => $data['min_book_hours'] ?? 0,
            'min_book_weeks' => $data['min_book_weeks'] ?? 0,
            'max_book_weeks' => $data['max_book_weeks'] ?? 0,
            'min_book_months' => $data['min_book_months'] ?? 0,
            'max_book_months' => $data['max_book_months'] ?? 0,
            'min_book_days' => $data['min_book_days'] ?? 0,
            'max_book_days' => $data['max_book_days'] ?? 0,
            'start_hour' => $data['start_hour'] ?? '',
            'end_hour' => $data['end_hour'] ?? '',
            'checkin_after' => $data['checkin_after'] ?? '',
            'checkout_before' => $data['checkout_before'] ?? '',
            'smoke' => $data['smoke'] ?? 0,
            'pets' => $data['pets'] ?? 0,
            'party' => $data['party'] ?? 0,
            'children' => $data['children'] ?? 0,
            'child' => $data['child'] ?? 0,
            'additional_rules' => $data['additional_rules'] ?? '',
        ]);
    }

    /**
     * Get listings for the dashboard.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */

    public function getDashboardListings($userId, $userType, $page = 1, $pageSize = 10, $search = null, $sortby = null)
    {
        $sortOptions = [
            'a_price'        => ['base_price', 'asc'],
            'd_price'        => ['base_price', 'desc'],
            'featured_first' => [DB::raw("CASE WHEN is_feature = 'yes' THEN 1 ELSE 0 END"), 'desc'],
            'a_date'         => ['created_at', 'asc'],
            'd_date'         => ['created_at', 'desc'],
            'a_title'        => ['listing_title', 'asc'],
            'd_title'        => ['listing_title', 'desc'],
        ];


        // Default sort
        [$sortColumn, $sortDirection] = $sortOptions[$sortby] ?? ['created_at', 'desc'];

        $query = Listings::with([
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
        ])
        ->when($userType !== 'admin', fn($q) => $q->where('user_id', $userId))
        ->when($search, function ($q) use ($search) {
            $q->where(function ($subQuery) use ($search) {
                $subQuery->where('listing_title', 'like', "%$search%")
                    ->orWhere('id', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%")
                    ->orWhere('base_price', 'like', "%$search%")
                    ->orWhere('status', 'like', "%$search%")
                    ->orWhere('listing_bedrooms', 'like', "%$search%")
                    ->orWhere('guests', 'like', "%$search%")
                    ->orWhere('l_beds', 'like', "%$search%")
                    ->orWhere('baths', 'like', "%$search%")
                    ->orWhere('listing_rooms', 'like', "%$search%");
            });
        })
        ->orderBy($sortColumn, $sortDirection);

        return $query->paginate($pageSize, ['*'], 'page', $page);
    }

    
    public function getListingDetailsForEdit($listingId, $user)
    {
        $query = Listings::with([
            'addresses.country',
            'addresses.state',
            'addresses.city',
            'addresses.area',
            'listingGallery',
            'beds',
            'extra',
            'services',
            'listinggallery',
            'feature',
            'terms',
            'price'
        ])
        ->when($user->user_type !== 'admin', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        });

        $listing = $query->find($listingId);

        if (!$listing) {
            return null;
        }

        $address = optional($listing->addresses)->first();
        $images = optional($listing->listinggallery)->first();

        return [
            ...$listing->toArray(),
            'city' => optional($address->city)->name,
            'map_address' => optional($address)->address,
            'state' => optional($address->state)->name,
            'zipCode' => optional($address)->zip_code,
            'latitude' => optional($address)->lat,
            'longitude' => optional($address)->long,
            'area' => optional($address->area)->name,
            'country' => optional($address->country)->name,
            'images' => optional($images)->image_path,
            'featured_image' => optional($images)->main_image,
            'video_path' => optional($images)->video_path
        ];
    }

    public function getSearchListings($page, $pageSize, $search = null, $sortby = null)
    {
        $sortOptions = [
            'a_price'        => ['base_price', 'asc'],
            'd_price'        => ['base_price', 'desc'],
            'featured_first' => [DB::raw("CASE WHEN is_feature = 'yes' THEN 1 ELSE 0 END"), 'desc'],
            'a_date'         => ['created_at', 'asc'],
            'd_date'         => ['created_at', 'desc'],
            'a_title'        => ['listing_title', 'asc'],
            'd_title'        => ['listing_title', 'desc'],
        ];


        // Default sort
        [$sortColumn, $sortDirection] = $sortOptions[$sortby] ?? ['created_at', 'desc'];

        $query = Listings::with([
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
        ])
        ->when($search, function ($q) use ($search) {
            $q->where(function ($subQuery) use ($search) {
                $subQuery->where('listing_title', 'like', "%$search%")
                    ->orWhere('id', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%")
                    ->orWhere('base_price', 'like', "%$search%")
                    ->orWhere('status', 'like', "%$search%")
                    ->orWhere('listing_bedrooms', 'like', "%$search%")
                    ->orWhere('guests', 'like', "%$search%")
                    ->orWhere('l_beds', 'like', "%$search%")
                    ->orWhere('baths', 'like', "%$search%")
                    ->orWhere('listing_rooms', 'like', "%$search%");
            });
        })
        ->orderBy($sortColumn, $sortDirection);

        return $query->paginate($pageSize, ['*'], 'page', $page);
    }
}
