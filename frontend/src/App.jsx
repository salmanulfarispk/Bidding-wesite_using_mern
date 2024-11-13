import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Home,Layout,ProductDetails ,Register,Login,LoginAsSeller,PrivateRoute,ScrollToTop }from './router/index.js'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";



axios.defaults.withCredentials = true 


const App = () => {


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




   </Routes>
   </BrowserRouter>
   
   </>
  )
}

export default App