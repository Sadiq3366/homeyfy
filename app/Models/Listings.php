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
        return $this->hasMany(Addresses::class,'id','listing_id');
    }
}
