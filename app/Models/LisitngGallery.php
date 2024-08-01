<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LisitngGallery extends Model
{
    use HasFactory;
    protected $table = 'media';
    protected $fillable=[
        'imageable_id',
        'imageable_type',
        'image_path',
        'video_path',
    ];
    public function listing()
    {
        return $this->belongsTo(Listings::class);
    }
    public function imageable()
    {
        return $this->morphTo();
    }
}
