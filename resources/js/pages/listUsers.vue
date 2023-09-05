<script setup>
    import usePeople from '../composables/users.js'
    import { onMounted } from 'vue';
    import {Form, Field} from 'vee-validate';
    import * as yup from 'yup';

    const { users, getUsers, updateForm, updateUser, deleteUser, newUser} = usePeople()
    const createUser = (values, { resetForm })=>{
        newUser(values, { resetForm });
        getUsers();
    }

    const registrationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
        passwordConfirm: yup.string().required('Confirm password is a required field').oneOf([yup.ref('password')], 'Your passwords do not match.')})

    const modalControl=(event, a)=>{
        var n = event.currentTarget.id;
        if (n=="editBtn"){
            document.getElementById("edit").style.display="block";
            document.getElementById("tbeid").value=a.id;
            document.getElementById("name").value=a.name;
            document.querySelector(".mte>span").innerHTML=a.name;
            document.getElementById("email").value=a.email;
            document.getElementById("delete").style.display="none";

            function allowSubmit(d){       
                if(document.getElementById("name").value.length>=1 && document.getElementById("email").value.length>=1 && (document.getElementById("name").value!=d.name || document.getElementById("email").value!=d.email)){
                    document.getElementById("form2Submit").disabled=false
                }
                else{
                    document.getElementById("form2Submit").disabled=true
                } 
            }
            document.getElementById("name").addEventListener("keyup",()=>{allowSubmit(a)})
            document.getElementById("email").addEventListener("keyup",()=>{allowSubmit(a)})
        }
        else{
            document.getElementById("edit").style.display="none";
            document.getElementById("delete").style.display="block";
            document.getElementById("tbdid").value=a.id;
        }
    }

    const delUser=()=>{
        deleteUser(document.getElementById("tbdid").value);
        getUsers();
    }

    const editUser=()=>{
        updateForm.id=document.getElementById("tbeid").value;
        updateForm.name=document.getElementById("name").value;
        updateForm.email=document.getElementById("email").value;
        updateUser();
        getUsers();
    }
    onMounted(getUsers)
</script>
<template>
    <div class="content-header">
    <div class="container-fluid">
    <div class="row mb-2">
    <div class="col-sm-6">
    <h1 class="m-0">Users</h1>
    </div>
    <div class="col-sm-6">
    <ol class="breadcrumb float-sm-right">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active">Users</li>
    </ol>
    </div>
    </div>
    <button class="btn btn-primary" data-toggle="modal" data-target="#newUserModal">Add new User</button>
    </div>
    </div>
    <div id="container">

        <div class="card">
            <div class="card-header text-center"><h1>All Users</h1></div>

            <div class="card-body">
        
    <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center"></th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Role</th>
                    <th class="text-center">Registration Date</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                
                    <tr v-for="(user, index) in users" :key="user.id">
                        <td class="td">{{index + 1}}</td>
                        <td class=td>{{user.name}}</td>
                        <td class=td>{{user.email}}</td>
                        <td class=td>{{user.role}}</td>
                        <td class=td>{{user.created_at}}</td>
                        <td class=td>
                            <a class="btn btn-info mx-1 btn-sm" id="editBtn" data-toggle="modal" @click="modalControl($event, user)" data-target="#exampleModal">Edit</a>
                            <a class="btn btn-danger mx-1 btn-sm" id="deleteBtn" data-toggle="modal" @click="modalControl($event, user)" data-target="#exampleModal">Delete</a>
                        </td>
                    </tr>
        
            </tbody>
        </table></div></div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div id="delete">
            <div class="modal-header">
                <h5 style="width:100%; text-align: center;" id="exampleModalLabel">Are you sure?</h5>
            </div>
            <form >
            
            <div class="modal-body" >
                This User will be permanently deleted from the database and cannot be recovered.
                <input id="tbdid"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-danger" data-dismiss="modal" @click="delUser">Confirm Delete</button>
            </div>
            </form>
            </div>
            <div id="edit">
            <div class="modal-header">
        <h5 class="modal-title mte" style="width:100%; text-align: center;" id="exampleModalLongTitle" >Edit <span></span> </h5>
        
      </div>
      <div class="modal-body" >
        <form>
            <div class="row mb-3">
                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                    <input type="text" id="name" name="name" class="form-control" required autofocus>
                </div>
            </div>
            <input id="tbeid"/>
            <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                <div class="col-md-6">
                    <input id=email type="email" class="form-control" name="email"  required>
                </div>
            </div>
        </form>
    </div>
      
      <div class="modal-footer">
        <button type="button" id="form2Close" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" id="form2Submit" disabled class="btn btn-primary" data-dismiss="modal"  @click="editUser" >Update</button>
      </div>
    </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="newUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style="width:100%; text-align: center;" id="exampleModalLongTitle" >Add New User </h5>
        
      </div>
      <Form @submit="createUser" :validation-schema="registrationSchema" v-slot="{errors}">
        <div class="modal-body">
            <div class="row mb-3 form-group">
                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                    <Field type="text" name="name" class="form-control" autofocus :class="{ 'is-invalid': errors.name}"/>
                    <span class="invalid-feedback">{{ errors.name }}</span>
                </div>
            </div>
            <div class="row mb-3 form-group">
                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                <div class="col-md-6">
                    <Field type="email" class="form-control" name="email" :class="{ 'is-invalid': errors.email}" />
                    <span class="invalid-feedback">{{ errors.email }}</span>
                </div>
            </div>
            <div class="row mb-3 form-group">
                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                <div class="col-md-6">
                    <Field id="password" type="password" class="form-control" name="password" :class="{ 'is-invalid': errors.password}" />
                    <span class="invalid-feedback">{{ errors.password }}</span>
                </div>
            </div>
            <div class="row mb-3 form-group">
                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm Password</label>
                <div class="col-md-6">
                    <Field id="password-confirm" type="password" class="form-control" name="passwordConfirm" :class="{ 'is-invalid': errors.passwordConfirm}" />
                    <span class="invalid-feedback">{{ errors.passwordConfirm }}</span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" id="formClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" id="formSubmit" class="btn btn-primary">Submit</button>
        </div>
    </Form>
    </div>
  </div>
</div>
</div>
</template>
<style>
    #container{
        text-align:center;
    }
    #edit, #delete{
        display: none;
    }
    #tbdid,#tbeid{
        display: none;
    }
</style>
