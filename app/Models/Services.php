<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    use HasFactory;
    protected $fillable=[
        'listing_id',
        'name',
        'price',
        'bed'
    ];
    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
}
