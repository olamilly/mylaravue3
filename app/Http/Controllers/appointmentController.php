<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;

class appointmentController extends Controller
{
    //
    public function read(){
        $appointments = Appointment::query()->with("client:id,first_name,last_name")
        ->when(Request('status'), function($query){
            return $query->where('status', Request('status'));
        })->latest()->paginate();
        //paginate
        $a=Appointment::all();
        
        $numbers=[0,0,0, count($a)];
        foreach ($a as $c) {
            if($c->status == 1){
                $numbers[0]++;
            }
            if($c->status == 2){
                $numbers[1]++;
            }
            if($c->status == 3){
                $numbers[2]++;
            }
        }
        
        \Log::info($numbers);
        return [$appointments, $numbers];
    }
}
