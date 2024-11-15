import { useSelector } from "react-redux"
import { selectIsLoggedIn} from "../redux/features/authslice"





export const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
  
    if (isLoggedIn) {
      return <>{children}</>;  //if logged in it shows beome a seller and profilecard
    }
  
    return null;
  };



  export const ShowOnLogout = ({ children }) => {

    const isLoggedIn= useSelector(selectIsLoggedIn);
  
    if (!isLoggedIn) {
        return <>{children}</>;  // if user not Logedin then shows  sign in and join
      
    }
  
    return null;
  };
