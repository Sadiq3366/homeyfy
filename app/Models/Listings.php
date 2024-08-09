<?php

namespace App\Models;

use Faker\Provider\Address;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Listings extends Model
{
    use HasFactory;
    use SoftDeletes;
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
        'l_beds',
        'baths',
        'listing_rooms',
        'listing_size',
        'listing_size_unit',
        'affiliate_booking_link',
        'virtual_tour'
    ];
    public function addresses()
    {
        return $this->morphMany(Addresses::class,'addressable');
    }
    public function listinggallery()
    {
        return $this->morphMany(LisitngGallery::class,'imageable');
    }
    public function beds()
    {
        return $this->hasMany(Beds::class,'listing_id');
    }
    public function extra()
    {
        return $this->hasMany(Extra::class,'listing_id');
    }
    public function services()
    {
        return $this->hasMany(Services::class,'listing_id');
    }
    public function feature()
    {
        return $this->hasMany(Feature::class,'listing_id');
    }
    public function terms()
    {
        return $this->hasMany(Term::class,'listing_id');
    }
}
