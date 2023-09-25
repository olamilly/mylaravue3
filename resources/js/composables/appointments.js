import { ref } from 'vue'
import axios from 'axios'
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
const toast = useToast();

export default function useAppointments() {
   
    const appointments=ref([])
    const statusData=ref([])

    const getAppointments = (a) => {
        var p={}
        if (a){
            p.status=a
        }
        
        axios.get(`/api/appointments`,{
            params: p,
        })
        .then((response)=>{
            appointments.value = response.data[0]
            statusData.value = response.data[1]
            setDate()
        })      
    }

    function handleError(error){
        // Check for specific status codes and show toast messages accordingly
        const statusCode = error.response.status;
        if (statusCode === 404) {
            toast.error('Not found: The requested resource was not found.');
        }
        else if (statusCode === 422) {
            toast.error(error.response.data.message);
        }
        else if (statusCode === 429) {
            toast.warning('Rate Limited: Too many requests, please try again later.');
        } else if (statusCode >= 500) {
            toast.error('Server Error');
        } else if (error.message === 'Network Error') {
            //implement retry here
            toast.error('No internet connection. Please check your network connection and try again.');
        }else {
            // A different error occurred here
            toast.error('An unexpected error occurred:');
            console.log(error)
        }
    }

    const setDate=()=>{
        const options1 = {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'};
        const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        appointments.value.data.forEach(i => {
            i.date=new Date(i.date).toLocaleDateString('en-US', options2);
            i.start_time=new Date('1970-01-01T' + i.start_time.slice(i.start_time.indexOf(" ")+1) + 'Z').toLocaleTimeString('en-US', options1);
            i.end_time=new Date('1970-01-01T' + i.end_time.slice(i.end_time.indexOf(" ")+1) + 'Z').toLocaleTimeString('en-US', options1);
        });   
    }

    

    return {
     appointments,
     getAppointments,
     statusData
    }
}