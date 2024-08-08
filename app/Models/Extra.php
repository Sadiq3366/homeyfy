<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    use HasFactory;
    protected $fillable=[
        'listing_id',
        'name',
        'price',
        'type'
    ];
    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
}
