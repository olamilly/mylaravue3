import { ref } from 'vue'
import axios from 'axios'
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
const toast = useToast();

export default function usePeople() {
    const users = ref({"data":[]})
    const userDetails = ref()
    const searchQuery=ref(null)
    const selectedUsers=ref([])

    const newUser = (a, { resetForm }) => {
        axios.post('/api/users', a)
        .then((response)=>{
            document.getElementById("formClose").click()
            toast.success('User Saved Successfully');
            resetForm()
        })
        .catch((error) =>{
            handleError(error)
            resetForm()
        });
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

    const getUsers = (page=1) => {
        axios.get(`/api/users?page=${page}`)
        .then((response)=>{
            users.value = response.data
            setDate()
        })      
    }

    const setDate=()=>{
        const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        users.value.data.forEach(i => {
            i.created_at=new Date(i.created_at.slice(0,10)).toLocaleDateString('en-US', options2);
        });   
    }

    const updateUser = (a, { resetForm }) => {
        axios.patch('/api/users', a)
        .then((response)=>{
            toast.success('User Updated Successfully');
            document.getElementById("form2Close").click()
            resetForm()
        }).catch((error) =>{
            handleError(error)
            resetForm()
        });
    }

    const deleteUser = (a) => {
        var url="/api/users/"+a;
        axios.delete(url)
        .then((response)=>{
            toast.success('User Deleted Successfully');
        })
    }

    const bulkDelete = ()=>{
        axios.delete("/api/users", {
            data:{
                ids: selectedUsers.value
            }
        })
        .then((response)=>{
            if (selectedUsers.value.length ==1){
                toast.success('User Deleted Successfully');
            }
            else{
                toast.success('Users Deleted Successfully');
            }
            
            selectedUsers.value=[]
        })
        .catch((error) =>{
            handleError(error)
        });
        getUsers();
    }

    const newRole =(u,e)=>{
        axios.put('/api/users', [u,e])
        .then((response)=>{
            toast.success('User Role Updated Successfully');
        })
        .catch((error) =>{
            handleError(error)
        });
    }

    const search=()=>{
        axios.get("/api/users/search",{
            params:{
                q:searchQuery.value
            }
        })
        .then((response)=>{
           users.value=response.data;
           setDate()
        })
    }
  
    return {
        users,
        getUsers,
        newUser,
        userDetails,
        updateUser,
        deleteUser,
        newRole,
        searchQuery,
        search,
        selectedUsers,
        bulkDelete
    }
}