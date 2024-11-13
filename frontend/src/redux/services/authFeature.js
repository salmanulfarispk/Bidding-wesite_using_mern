import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const Auth_URL= `${backendUrl}/user/`


const register= async(userData)=>{
    const response=await axios.post(Auth_URL+'register',userData)
    console.log(response);
    
    return response.data;
}




const authService ={
    register
}

export default authService