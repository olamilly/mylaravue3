<script setup>
    import useAppointments from '../composables/appointments.js';
    import { onMounted } from 'vue';
    

    const { appointments, getAppointments, statusData} = useAppointments()
    onMounted(getAppointments)
    const toggleActive=(e)=>{
        var bl =document.querySelectorAll(".btn-group>button")
        bl.forEach(i=>{
            i.classList.remove("btn-secondary")
            i.classList.add("btn-default")
        })
        e.currentTarget.classList.remove("btn-default")
        e.currentTarget.classList.add("btn-secondary")
    }
</script>
<template>
    <div>
    <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Appointments</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link to="/admin/dashboard">Home</router-link>
                            </li>
                            <li class="breadcrumb-item active">Appointments</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    
                    <div class="card">
                        <div class="card-header text-center"><h1>All Appointments</h1></div>
                        <div class="d-flex justify-content-between mb-1 mt-1">
                        <div>
                            <router-link to="/admin/appointments/create">
                                <button class="btn btn-primary"><i class="fa fa-plus-circle mr-1"></i> Add New
                                    Appointment</button>
                            </router-link>
                        </div>
                        <div class="btn-group">
                            <button @click="getAppointments(), toggleActive($event)" type="button" class="btn btn-secondary">
                                <span class="mr-1">All</span>
                                <span class="badge badge-pill badge-info">{{ statusData[3] }}</span>
                            </button>

                            <button @click="getAppointments(1), toggleActive($event)" type="button" class="btn btn-default">
                                <span class="mr-1">Scheduled</span>
                                <span class="badge badge-pill badge-primary">{{ statusData[0] }}</span>
                            </button>
            
                            <button @click="getAppointments(3),toggleActive($event)" type="button" class="btn btn-default">
                                <span class="mr-1">Confirmed</span>
                                <span class="badge badge-pill badge-success">{{ statusData[2] }}</span>
                            </button>

                            <button @click="getAppointments(2),toggleActive($event)" type="button" class="btn btn-default">
                                <span class="mr-1">Cancelled</span>
                                <span class="badge badge-pill badge-danger">{{ statusData[1] }}</span>
                            </button>
                        </div>
                    </div>
                        <div class="card-body">
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Client Name</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Start</th>
                                        <th scope="col">End</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody  v-if="appointments.data">
                                    <tr v-for="(appointment, index) in appointments.data" :key="appointment.id">
                                        <td>{{index + 1}}</td>
                                        <td>{{appointment.client.first_name}} {{appointment.client.last_name}}</td>
                                        <td>{{appointment.title}}</td>
                                        <td>{{appointment.description}}</td>
                                        <td>{{appointment.date}}</td>
                                        <td>{{appointment.start_time}}</td>
                                        <td>{{appointment.end_time}}</td>
                                        <td>
                                            <span v-if="appointment.status == 1" class="badge badge-primary">Scheduled</span>
                                            <span v-if="appointment.status == 2" class="badge badge-danger">Cancelled</span>
                                            <span v-if="appointment.status == 3" class="badge badge-success">Confirmed</span>
                                        </td>
                                        <td>
                                            <a href="">
                                                <i class="fa fa-edit mr-2"></i>
                                            </a>

                                            <a href="">
                                                <i class="fa fa-trash text-danger"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <td colspan="9"><h2 style="text-align: center;width: 100%;">No Appointments yet...</h2></td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div style="width:100%; display:flex; justify-content: center;"><Bootstrap4Pagination
        :data="appointments"
        @pagination-change-page="getAppointments"
    /></div>-->
    </div>
    
    </div>
</template>
<style>
h1{
    width:100%;
    text-align: center;
}
th, td{
    text-align: center;
}
</style>