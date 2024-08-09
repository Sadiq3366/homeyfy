<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable=[
        'name',
        'state_id'
    ];

    public function state()
    {
        return $this->belongsTo(State::class);
    }
    public function area()
    {
        $this->hasMany(Area::class);
    }

}
