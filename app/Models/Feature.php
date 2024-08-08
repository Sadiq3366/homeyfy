<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;
    protected $fillable=[
        'listing_id',
        'amenities',
        'facilities'
    ];

    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
}
