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

const logout= async()=>{
    const response=await axios.get(Auth_URL+'logout')
    return response.data.message;
};

const getLogInStatus= async()=>{
    const response=await axios.get(Auth_URL+'loggedin')
    return response.data;
};


const getUserProfile= async()=>{
    const response=await axios.get(Auth_URL+'getUser')
    return response.data;
};


const loginUserAsSeller= async(userData)=>{
    const response=await axios.post(Auth_URL+'sellerlogin',userData,{
        withCredentials:true
    })
    return response.data;
};


const getUserBalance= async()=>{
    const response=await axios.get(Auth_URL+'sell-amount')
    return response.data;
};


//only admin can access 

const getIncome= async()=>{
    const response=await axios.get(Auth_URL+'estimate-Income')
    return response.data;
};

const getAllUsers= async()=>{
    const response=await axios.get(Auth_URL+'allUsers')
    return response.data;
};



const authService ={
    register,
    login,
    logout,
    getLogInStatus,
    getUserProfile,
    loginUserAsSeller,
    getUserBalance,
    getIncome,
    getAllUsers
}

export default authService