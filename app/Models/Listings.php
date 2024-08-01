<?php

namespace App\Models;

use Faker\Provider\Address;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listings extends Model
{
    use HasFactory;
    protected $fillable = [
        'listing_title',
        'description',
        'listing_type',
        'base_price',
        'price_mode',
        'is_instance',
        'status',
        'user_id',
        'listing_bedrooms',
        'guests',
        'beds',
        'baths',
        'listing_rooms',
        'listing_size',
        'listing_size_unit',
        'affiliate_booking_link',
    ];
    public function addresses()
    {
        return $this->morphMany(Addresses::class,'addressable');
    }
    public function listinggallery()
    {
        return $this->morphMany(LisitngGallery::class,'imageable');
    }
}
