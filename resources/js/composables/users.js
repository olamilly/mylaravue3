import { ref } from 'vue'
import axios from 'axios'


export default function usePeople() {
    const users = ref([])

    const getUsers = async () => {
        let response = await axios.get('/api/users')
        users.value = response.data.users
       
        const options2 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        users.value.forEach(i => {
            i.created_at=new Date(i.created_at.slice(0,10)).toLocaleDateString('en-US', options2);
        });      
    }

  
    return {
        users,
        getUsers
    }
}