<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beds extends Model
{
    use HasFactory;
    protected $fillable=[
            'listing_id',
            'name',
            'guests',
            'beds',
            'type',
    ];
    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
    public function bedgallery()
    {
        return $this->morphMany(LisitngGallery::class,'imageable');
    }
}
