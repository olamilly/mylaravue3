<?php

namespace App\Http\Controllers;
use App\Models\User;
use Validator;
use Illuminate\Http\Request;

class userController extends Controller
{
    //
    public function create(Request $r){
        $input = $r->all();
        $validator = $r->validate([ 
            'name' => 'required', 
            'email' => 'required|email|unique:users', 
            'password' => 'required|min:8', 
            'passwordConfirm' => 'required|same:password', 
        ]);
        
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input);
        return $user;
    }

    public function read(){
        $userlist = User::paginate(5);
        return $userlist;
    }

    public function update(Request $r){
        $validator = $r->validate([ 
            'name' => 'required', 
            'email' => 'required|unique:users,email,'.$r->id,
            'password' => 'sometimes|min:8', 
        ]);
        $model = User::where("id",$r->id)->first();

        $model->name = $r->name;
        $model->email = $r->email;
        if ($r->password){
            $model->password=bcrypt($r->password);
        }
        $model->update();
        return $model;
    }

    public function delete(string $id){
        $model = User::where("id",$id)->first();
        $model->delete();
    }

    public function bulkDelete(Request $r){
        User::whereIn('id',$r->ids)->delete();
    }

    public function editrole(Request $r){
        $model = User::where("id",$r[0])->first();
        $model->role=$r[1];
        $model->update();
    }

    public function search(Request $query){
        $q=$query->q;
        $users= User::where("name","like","%{$q}%")->orWhere("email","like","%{$q}%")->get();
        return response()->json($users);
    }
}
