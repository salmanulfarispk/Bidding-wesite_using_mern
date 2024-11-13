import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Caption, Container, CustomNavLink, PrimaryButton, Title } from "../../router/index";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../redux/features/authslice";



const initialState={
  name:'',
  email:'',
  password:'',
  confirmPassword:''
}

export const Register = () => {


   const dispatch= useDispatch()
   const navigate=useNavigate()
   const [formData,setFormData]=useState(initialState)
  
   const {name,email,password,confirmPassword}=formData 

   const {isLoading,isSuccess,isLoggedIn,user,message,isError}=useSelector((state)=> state.auth)


   const handleInputChange=(e)=>{
     const {name,value}=e.target;
       setFormData({
        ...formData,
         [name]: value
       })
   }

   const handleRegister=(e)=>{
     e.preventDefault();


     if(!name || !email || !password || !confirmPassword){
        return toast.error('All fields are required!')
     }

     if(password.length < 8){
      return toast.error('password must be 8 characters!')
       
     }
     if(password !== confirmPassword){
      return toast.error('confirm password wrong!')
       
     }

     const userData={
      name,email,password
     }

     dispatch(register(userData))

   }

  return (
    <>
      <section className="regsiter pt-16 relative">

        <div className="hidden md:block bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>

        <div className="bg-[#241C37] pt-8 h-[40vh] relative content">
          <Container>
            <div>
              <Title level={3} className="text-white">
                Sign Up
              </Title>
              <div className="flex items-center gap-3">
                <Title level={5} className="text-green font-normal text-xl">
                  Home
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  /
                </Title>
                <Title level={5} className="text-white font-normal text-xl">
                  Sign Up
                </Title>
              </div>
            </div>
          </Container>
        </div>


        <form className="bg-white shadow-s3 w-full md:w-1/3 m-auto my-16 p-8 rounded-xl" onSubmit={handleRegister}>
          <div className="text-center">
            <Title level={5}>Sign Up</Title>
            <p className="mt-2 text-lg">
              Do you already have an account? <CustomNavLink href="/login">Log In Here</CustomNavLink>
            </p>
          </div>
          <div className="py-5">
            <Caption className="mb-2">Username *</Caption>
            <input type="text" name="name" value={name} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="First Name" />
          </div>
          <div className="py-1">
            <Caption className="mb-2">Enter Your Email *</Caption>
            <input type="email" name="email" value={email} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Email" />
          </div>
          <div>
            <Caption className="mb-2">Password *</Caption>
            <input type="password" name="password" value={password} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Password" />
          </div>
          <div>
            <Caption className="mb-2 mt-2">Confirm Password *</Caption>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Confirm password" />
          </div>
          <div className="flex items-center gap-2 py-4">
            <input type="checkbox" />
            <Caption>I agree to the Terms & Policy</Caption>
          </div>
          <PrimaryButton className="w-full rounded-none my-5">CREATE ACCOUNT</PrimaryButton>

          <div className="text-center border py-4 rounded-lg mt-4">
            <Title>OR SIGNUP WITH</Title>
            <div className="flex items-center justify-center gap-5 mt-5">
              <button className="flex items-center gap-2 bg-red-500 text-white p-3 px-5 rounded-sm">
                <FaGoogle />
                <p className="text-sm">SIGNUP WHIT GOOGLE</p>
              </button>
              <button className="flex items-center gap-2 bg-indigo-500 text-white p-3 px-5 rounded-sm">
                <FaFacebook />
                <p className="text-sm">SIGNUP WHIT FACEBOOK</p>
              </button>
            </div>
          </div>
          <p className="text-center mt-5">
            By clicking the signup button, you create a Cobiro account, and you agree to Cobiros <span className="text-green underline">Terms & Conditions</span> &
            <span className="text-green underline"> Privacy Policy </span> .
          </p>
        </form>

        <div className="hidden md:block bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute bottom-96 right-0"></div>

      </section>
    </>
  );
};