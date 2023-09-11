<script setup>
    import usePeople from '../composables/users.js'
    import { onMounted, watch } from 'vue';
    import {Form, Field} from 'vee-validate';
    import * as yup from 'yup';
    import { debounce } from 'lodash';

    const { users, getUsers, userDetails, updateUser, deleteUser, newUser, newRole, searchQuery, search} = usePeople()

    const createUser = (values, { resetForm })=>{
        newUser(values, { resetForm });
        getUsers();
    }

    const registrationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
        passwordConfirm: yup.string().required('Confirm password is a required field').oneOf([yup.ref('password')], 'Your passwords do not match.')})
    
    const updateSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().when((password, schema)=>{
            return password!="" ? schema.required().min(8) : schema;
        })
    })

    const changeRole=(u, e)=>{
        newRole(u.id,e);
        getUsers();
    }
    watch(searchQuery, debounce(()=>{
        search();
    }, 300))
    
    const modalControl=(event, a)=>{
        var n = event.currentTarget.id;
        if (n=="editBtn"){
            document.getElementById("edit").style.display="block";
            userDetails.value=a;
            document.querySelector(".mte>span").innerHTML=a.name;
            document.getElementById("delete").style.display="none";

            function allowSubmit(d){       
                if(document.getElementById("name").value!=d.name || document.getElementById("email").value!=d.email || document.getElementById("password").value!=""){
                    document.getElementById("form2Submit").disabled=false
                }
                else{
                    document.getElementById("form2Submit").disabled=true
                } 
            }
            document.getElementById("name").addEventListener("keyup",()=>{allowSubmit(a)})
            document.getElementById("email").addEventListener("keyup",()=>{allowSubmit(a)})
            document.getElementById("password").addEventListener("keyup",()=>{allowSubmit(a)})
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

    const editUser=(values, { resetForm })=>{
        updateUser(values, { resetForm });
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
    
    </div>
    </div>
    <div id="container">

        <div class="card">
            <div class="card-header text-center"><h1>All Users</h1></div>
            <div class="py-1" style="display: flex; justify-content: space-between; align-items: center;">
                <button class="btn btn-primary" data-toggle="modal" data-target="#newUserModal">Add new User</button>
                <div style="display: flex;">
                    <input type="text" v-model="searchQuery" placeholder="Search Users" class="form-control mx-1" style="width: 27%; min-width: 264px;"/>
                   
                </div>
            </div>
            <div class="card-body">
        
    <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th class="text-center"></th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Registration Date</th>
                    <th class="text-center">Role</th>
                    <th class="text-center">Options</th>
                </tr>
            </thead>
            <tbody v-if="users.length > 0">
                    <tr v-for="(user, index) in users" :key="user.id">
                        <td class="td">{{index + 1}}</td>
                        <td class=td>{{user.name}}</td>
                        <td class=td>{{user.email}}</td>
                        <td class=td>{{user.created_at}}</td>
                        <td class=td>
                            <select class="form-control" @change="changeRole(user, $event.target.value)">
                                <option>{{user.role}}</option>
                                <option v-if="user.role=='User'" >Admin</option>
                                <option v-if="user.role=='Admin'">User</option>
                            </select>
                        </td>
                        <td class=td>
                            <a class="mx-1" id="editBtn" data-toggle="modal" @click="modalControl($event, user)" data-target="#exampleModal"><i class="fa fa-edit"></i></a>
                            <a class="mx-1" id="deleteBtn" data-toggle="modal" @click="modalControl($event, user)" data-target="#exampleModal"><i class="fa fa-trash text-danger"></i></a>
                        </td>
                    </tr>
            </tbody>
            <tbody v-else>
                <td colspan="6"><h2 style="text-align: center;width: 100%;">No Users Found...</h2></td>
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
      <Form @submit="editUser" :validation-schema="updateSchema" v-slot="{errors}" :initial-values="userDetails">
      <div class="modal-body" >
            <div class="row mb-3">
                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>
                <div class="col-md-6">
                    <Field type="text" name="name" id="name" class="form-control" autofocus :class="{ 'is-invalid': errors.name}"/>
                    <span class="invalid-feedback">{{ errors.name }}</span>
                </div>
            </div>
            <Field id="tbeid" name="id"/>
            <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                <div class="col-md-6">
                    <Field type="email" id="email" class="form-control" name="email" :class="{ 'is-invalid': errors.email}" />
                    <span class="invalid-feedback">{{ errors.email }}</span>
                </div>
            </div>
            <div class="row mb-3">
                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                <div class="col-md-6">
                    <Field type="password" id="password" class="form-control" name="password" :class="{ 'is-invalid': errors.password}" />
                    <span class="invalid-feedback">{{ errors.password }}</span>
                </div>
            </div>
        
        </div>
      
      <div class="modal-footer">
        <button type="button" id="form2Close" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" id="form2Submit" disabled class="btn btn-primary" >Update</button>
      </div></Form>
    
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
                    <Field type="password" class="form-control" name="password" :class="{ 'is-invalid': errors.password}" />
                    <span class="invalid-feedback">{{ errors.password }}</span>
                </div>
            </div>
            <div class="row mb-3 form-group">
                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm Password</label>
                <div class="col-md-6">
                    <Field type="password" class="form-control" name="passwordConfirm" :class="{ 'is-invalid': errors.passwordConfirm}" />
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
