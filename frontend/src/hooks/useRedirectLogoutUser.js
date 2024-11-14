import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const UseRedirectLogoutUser = (path) => {
 
    const navigate=useNavigate()

    useEffect(()=>{

        let isLoggedIn;
        
        const redirectloggedOutUser = async()=>{
            try {
                isLoggedIn='';
                
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
