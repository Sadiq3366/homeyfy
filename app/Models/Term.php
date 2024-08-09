<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Term extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable=[
        'listing_id',
        'cancellation_policy',
        'min_book_hours',
        'min_book_weeks',
        'max_book_weeks',
        'min_book_months',
        'max_book_months',
        'min_book_days',
        'max_book_days',
        'start_hour',
        'end_hour',
        'checkin_after',
        'checkout_before',
        'smoke',
        'pets',
        'party',
        'children',
        'child',
        'additional_rules',
    ];

    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }

}
