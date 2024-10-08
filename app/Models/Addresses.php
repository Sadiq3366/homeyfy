<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Addresses extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'addressable_id',
        'addressable_type',
        'address',
        'zip_code',
        'state_id',
        'city_id',
        'country_id',
        'area_id',
    ];
    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
    public function state()
    {
        return $this->belongsTo(State::class);
    }
    public function area()
    {
        return $this->belongsTo(Area::class);
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
