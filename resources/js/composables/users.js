import { ref, reactive } from 'vue'
import axios from 'axios'
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
const toast = useToast();

export default function usePeople() {
    const users = ref([])

    const updateForm = reactive({
        id:"",
        name: '',
        email: '',
    })

    const newUser = (a, { resetForm }) => {
        axios.post('/api/users', a)
        .then((response)=>{
            document.getElementById("formClose").click()
            toast.success('User Saved Successfully');
            resetForm()
        })
        .catch((error) =>{
            handleError(error)
        });
    }

    function handleError(error){
        // Check for specific status codes and show toast messages accordingly
        const statusCode = error.response.status;
        if (statusCode === 404) {
            toast.error('Not found: The requested resource was not found.');
        } 
        else if (statusCode === 429) {
            toast.warning('Rate Limited: Too many requests, please try again later.');
        } else if (statusCode >= 500) {
            toast.error('Failed to add user.\nEmail Address already in use.');
        } else if (error.message === 'Network Error') {
            //implement retry here
            toast.error('No internet connection. Please check your network connection.');
        }else {
            // A different error occurred here
            toast.error('An unexpected error occurred:');
            console.log(error)
        }
    }

    const getUsers = async () => {
        let response = await axios.get('/api/users')
        users.value = response.data.users
       
        const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        users.value.forEach(i => {
            i.created_at=new Date(i.created_at.slice(0,10)).toLocaleDateString('en-US', options2);
        });      
    }

    const updateUser = () => {
        axios.patch('/api/users', updateForm)
        .then((response)=>{
            toast.success('User Updated Successfully');
            updateForm.id=""
            updateForm.name=""
            updateForm.email=""
        })
    }

    const deleteUser = (a) => {
        var url="/api/users/"+a;
        axios.delete(url)
        .then((response)=>{
            toast.success('User Deleted Successfully');
        })
    }
  
    return {
        users,
        getUsers,
        newUser,
        updateForm,
        updateUser,
        deleteUser,
    }
}