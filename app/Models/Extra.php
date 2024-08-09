<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Extra extends Model
{
    use HasFactory;
    use SoftDeletes;
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
