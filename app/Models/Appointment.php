<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Appointment extends Model
{
    public function client(): BelongsTo{
        return $this->belongsTo(Client::class);
    }
    use HasFactory;
}
