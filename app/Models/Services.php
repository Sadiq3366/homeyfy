<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Services extends Model
{
    use HasFactory;
    use SoftDeletes;
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
