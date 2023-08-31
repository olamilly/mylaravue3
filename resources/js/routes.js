import Dashboard from "./components/dashboard.vue";
import ListAppointments from "./pages/listAppointments.vue";
import ListUsers from "./pages/listUsers.vue";
import Settings from "./pages/settings.vue";
import Profile from "./pages/profile.vue";
export default[
    {
        path:'/admin/dashboard',
        name:'admin.dashboard',
        component: Dashboard
    },
    {
        path:'/admin/appointments',
        name:'admin.appointments',
        component: ListAppointments
    },
    {
        path:'/admin/users',
        name:'admin.users',
        component: ListUsers
    },
    {
        path:'/admin/settings',
        name:'admin.settings',
        component: Settings
    },
    {
        path:'/admin/profile',
        name:'admin.profile',
        component: Profile
    },
    
]