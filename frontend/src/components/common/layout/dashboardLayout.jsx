import { useLocation } from "react-router-dom";
import { Sidebar } from "../../admin/Sidebar";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { Container } from "../Design";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getuserProfile } from "../../../redux/features/authslice";
import { UseRedirectLogoutUser } from "../../../hooks/useRedirectLogoutUser";

export const DashboardLayout = ({ children }) => {

  UseRedirectLogoutUser('/login')

  const location = useLocation();
  const dispatch= useDispatch()
  const {role,isLoggedIn}=useUserProfile()
   
  useEffect(()=>{
     if(isLoggedIn){
      dispatch(getuserProfile())
     }
  },[dispatch,location,isLoggedIn])



  return (
    <>
      <div className="mt-32">
        <Container className="flex">
          <div className={`${role === "admin" ? "h-[112vh]" : role === "seller" ? "h-[85vh]" : "h-[80vh]"} w-[25%] shadow-s1 py-6 md:py-8 p-4 md:p-5 rounded-lg`}>
            <Sidebar role={role} />
          </div>
      
          <div className="w-[75%] px-2 ml-1 md:px-5 md:ml-10 rounded-lg">{children}</div>
        </Container>
      </div>
    </>
  );
};