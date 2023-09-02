import { ref, reactive } from 'vue'
import axios from 'axios'


export default function usePeople() {
    const users = ref([])

    const delid = ref()

    const registerForm = reactive({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const updateForm = reactive({
        id:"",
        name: '',
        email: '',
    })

    const newUser = () => {
        axios.post('/api/users', registerForm)
        .then((response)=>{
            registerForm.name=""
            registerForm.email=""
            registerForm.password=""
            registerForm.passwordConfirm=""
        })
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
            updateForm.id=""
            updateForm.name=""
            updateForm.email=""
        })
    }

    const deleteUser = (a) => {
        var url="/api/users/"+a;
        axios.delete(url)
    }
  
    return {
        users,
        getUsers,
        newUser,
        registerForm,
        updateForm,
        updateUser,
        deleteUser
    }
}