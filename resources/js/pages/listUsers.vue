<script setup>
    // import axios from 'axios';
    // import { onMounted } from 'vue';
    // const users=[{
    //     id:1,
    //     name:"John Doe",
    //     email:"olamide@gmail.com",
    //     role:"user",
    //     date:"date"//created_at
    // },
    // {
    //     id:2,
    //     name:"Ola Doe",
    //     email:"Doe2@gmail.com",
    //     role:"admin",
    //     date:"date"//created_at
    // }]

    import usePeople from '../composables/users.js'
    import { onMounted } from 'vue';

    const { users, getUsers } = usePeople()

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
 <h1>All Users</h1>
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
                        <a class="btn btn-info mx-1 btn-sm" href="#">Edit</a>
                        <a class="btn btn-success mx-1 btn-sm" href="#">Details</a>
                        <a class="btn btn-danger mx-1 btn-sm" data-toggle="modal" data-target="#exampleModal">Delete User</a>
                    </td>
                </tr>

                
                
               
        </tbody>
    </table>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="text-center" id="exampleModalLabel">Are you sure?</h5>
                    </div>
                    <form >
                    
                    <div class="modal-body">
                        This User will be permanently deleted from the database and cannot be recovered.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary userDelete" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-danger">Confirm Delete</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
</div>
</template>
<style>
    #container{
        text-align:center;
    }
</style>
