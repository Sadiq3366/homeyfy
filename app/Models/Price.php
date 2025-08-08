<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Price extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'price';
    protected $fillable=[
            'listing_id',
            'price_postfix',
            'weekends_price',
            'weekends_days',
            'priceWeek',
            'priceMonthly',
            'allow_additional_guests',
            'additional_guests_price',
            'num_additional_guests',
            'cleaning_fee',
            'cleaning_fee_type',
            'city_fee',
            'city_fee_type',
            'security_deposit'
    ];
    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
}
