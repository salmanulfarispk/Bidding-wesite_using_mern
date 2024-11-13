import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const Auth_URL= `${backendUrl}/user/`


const register= async(userData)=>{
    const response=await axios.post(Auth_URL+'register',userData)
    return response.data;
};


const login= async(userData)=>{
    const response=await axios.post(Auth_URL+'login',userData)
    return response.data;
};




const authService ={
    register,
    login
}

export default authService