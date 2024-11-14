import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../redux/services/authFeature"


export const UseRedirectLogoutUser = (path) => {
 
    const navigate=useNavigate()

    useEffect(()=>{

        let isLoggedIn;
        
        const redirectloggedOutUser = async()=>{
            try {
                isLoggedIn= await authService.getLogInStatus()

            } catch (error) {
                console.log(error.message);   
            }
           
            if(!isLoggedIn){
                navigate(path)
                return ;
            }
        };

       redirectloggedOutUser()

    },[path,navigate])

}
