<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class userController extends Controller
{
    //
    public function create(Request $r){
        \Log::info($r);
        $input = $r->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input);
        return $user;
    }

    public function read(){
        $userlist = User::all();
        return response()->json(["users"=>$userlist]);
    }

    public function update(Request $r){
        $model = User::where("id",$r->id)->first();
        if($r->name){
            $model->name = $r->name;
        }
        if($r->email){
            $model->email = $r->email;
        }
        $model->update();
        return $model;
    }
    public function delete(string $id){
        $model = User::where("id",$id)->first();
        $message=str_replace("name", $model->name, "User name has been deleted successfully");
        $model->delete();
        return response->json(["message"=>$message]);
    }
}
