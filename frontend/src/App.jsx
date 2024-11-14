import { BrowserRouter,Routes,Route} from "react-router-dom"
import { Home,Layout,ProductDetails ,Register,Login,LoginAsSeller,PrivateRoute,ScrollToTop,Dashboard,
   DashboardLayout,
   UserProfile
 } from './router/index.js'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLogInstatus } from "./redux/features/authslice.js";



axios.defaults.withCredentials = true 


const App = () => {

  const dispatch= useDispatch()
  const { isLoggedIn }=useSelector(state => state.auth)
 
    useEffect(()=>{
     
      dispatch(getLogInstatus())

      //  if(isLoggedIn && user=== null){

      //  }
    },[dispatch])

  return (
   <>
   
   <BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath: true}}>

    <ScrollToTop />
    <ToastContainer position="bottom-right"/>

   <Routes>

    <Route path="/" element={
       <Layout>
        <Home />
      </Layout>  }/>

      <Route path="/details/:id"  element={
        <Layout>
          <ProductDetails />
        </Layout>
      }/>

         <Route path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
                 }
         />

       <Route path="/login" 
        element={
          <Layout>
            <Login />
          </Layout>
        }
        />

           <Route
            path="/seller/login"
            element={
              <PrivateRoute>
                <Layout>
                  <LoginAsSeller />
                </Layout>
              </PrivateRoute>
            }
          />
         
         <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                 <DashboardLayout>
                   <Dashboard />
                 </DashboardLayout>
              </Layout>
            </PrivateRoute>
            }
         />

           <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </Layout>
              </PrivateRoute>
            }
            />



   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App