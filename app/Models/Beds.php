<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Beds extends Model
{
    use HasFactory;
    use SoftDeletes;
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
