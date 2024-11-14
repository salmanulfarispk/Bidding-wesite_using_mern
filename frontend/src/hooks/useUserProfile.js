import { useDispatch, useSelector } from "react-redux"
import { getuserProfile, selectIsLoggedIn } from "../redux/features/authslice"
import { useEffect, useState } from "react"


export const useUserProfile =()=>{

    const dispatch=useDispatch()
    const isLoggedIn= useSelector(selectIsLoggedIn)
    const {user, isLoading }=useSelector((state)=> state.auth)
    const [role,setRole]=useState(()=> user.role || JSON.parse(localStorage.getItem('user')))


    useEffect(()=>{
      
        if(isLoading && !user){
            dispatch(getuserProfile())
        }else if(user) {
          setRole(user.role)
        }
    },[dispatch,isLoading,user])

    

    useEffect(()=>{
        if(user){
            setRole(user.role)
        }
    },[user])


    return {role,isLoading,isLoggedIn}
}