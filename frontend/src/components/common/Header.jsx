import React, { useEffect, useRef, useState } from 'react'
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from './Design'
import { menuLists } from '../../assets/data'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom'
import {User1} from "../hero/Hero"
import { NavLink } from 'react-router-dom'
import { ShowOnLogin, ShowOnLogout } from '../../utils/HiddenLinks';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { getuserProfile, selectIsLoggedIn } from '../../redux/features/authslice';
import { MdNotificationsActive } from "react-icons/md";
import io from 'socket.io-client'
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const BIDDING_URL= `${backendUrl}/bidding/`


export const Header = () => {

  const [isOpen,setIsOpen]=useState(false)
  const [isScrolled,setIsScrolled]=useState(false)
  const [NotiOpen,setNotiOpen]=useState(false)
  const [NotiData,setNotiData]=useState([])
  const dispatch=useDispatch()

 const isLoggedIn=useSelector(selectIsLoggedIn)
 const { user }=useSelector((state)=> state.auth)

  const location=useLocation()

  const menuRef= useRef(null)

  const toggleMenu =()=>{
     setIsOpen(!isOpen)
  }


  const closeMenuOutside = (event)=>{
     if(menuRef.current && !menuRef.current.contains(event.target)){
      setIsOpen(false)
     }
  }

  const handleScroll =()=>{
     setIsScrolled(window.scrollY > 0)
  };

  useEffect(()=>{
    document.addEventListener('mousedown',closeMenuOutside)
    window.addEventListener('scroll',handleScroll)

    return ()=>{
       document.removeEventListener('mousedown',closeMenuOutside)
       window.removeEventListener('scroll',handleScroll)
    }
  },[])

 const isHomePage=location.pathname === '/' ;

 const { role } = useUserProfile()

 useEffect(()=>{
  if(isLoggedIn){
    dispatch(getuserProfile())
  }
 },[dispatch,isLoggedIn])


 useEffect(() => {

  const socket = io('http://localhost:5000');

  axios.get(BIDDING_URL+"notification").then((response)=>{
    setNotiData(response.data)
  })

  socket.on('send-to-all', (data) => {
    setNotiData(data);
  });

  return () => {
    socket.off('send-to-all'); 
    socket.disconnect(); 
  };

  }, [user,isLoggedIn]);


 


  return (
   <header className={isHomePage ? `header relative py-1 bg-primary ${isScrolled ? 'scrolled' : ''} ` : `header bg-white shadow-s1 ${isScrolled? 'scrolled' : ''}`}>
    <Container>
      <nav className='p-4 flex justify-between items-center relative'>

        <div className='flex items-center gap-14'>
          <div>
            {isHomePage && !isScrolled ? (
            <img src='../images/commonimgs/header-logo.png' alt='logo' className='h-11'/>   
            ):(
              <img src='../images/commonimgs/header-logo2.png' alt='logo' className='h-11'/>   
            )}
          </div>

          <div className='hidden lg:flex items-center justify-between gap-8'>
            {menuLists.map((list)=>(
              <li key={list.id} className='capitalize list-none'>
                <CustomNavLinkList href={list.path} isActive={location.pathname === list.path}
                 className={`${isScrolled || !isHomePage ? 'text-black' : 'text-white'}`}
                >
                   {list.link}
                </CustomNavLinkList>
              </li>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 icons">
          <div className='hidden lg:flex lg:items-center lg:gap-8 text-white'>
          <IoSearchOutline size={23} className={`${isScrolled || !isHomePage ? 'text-black' : 'text-white'}`}/>

        {isLoggedIn && role === "buyer" && (
            <ShowOnLogin>
           <CustomNavLinkList href='/seller/login' className={`${isScrolled || !isHomePage ? 'text-black' : 'text-white'}`}>
              Become a seller
          </CustomNavLinkList>
          </ShowOnLogin>
        )}
          
          
          <ShowOnLogout>
          <CustomNavLinkList href='/login' className={`${isScrolled || !isHomePage ? 'text-black' : 'text-white'}`}>
             Sign in
          </CustomNavLinkList>
          <CustomNavLinkList href='/register' className={`${!isHomePage || isScrolled ? "bg-green" : "bg-white"} px-8 py-2 rounded-full text-primary shadow-md`}>
             Join
          </CustomNavLinkList>
          </ShowOnLogout>
          
            
              <ShowOnLogin>
 
              <MdNotificationsActive size={30} onClick={()=> setNotiOpen(!NotiOpen)} className={`cursor-pointer ${!isHomePage || isScrolled ? "text-green" : ""} `}/>
               {NotiOpen && (
                <div className="absolute top-[85px] right-2 rounded-2xl border w-1/3 border-blue-100 bg-white p-4 shadow-lg sm:p-5 lg:p-6" role="alert">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
                    <svg
                      className="size-4"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="cursor-pointer font-medium sm:text-lg text-blue-700">New message!</p>
                </div>
               {NotiData.map((noti,index)=> (
                <div className="mt-4 text-gray-500 shadow-sm border-b p-3 rounded-md mb-2" key={index}>
                  <span className='font-bold uppercase me-2'>{noti?.name}</span> {noti?.message}
                </div>
                ))}
            
                <div className="mt-4 sm:flex  justify-end sm:gap-4">
                  
                  <button
                    className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
                  >
                    Mark as Read
                  </button>
                </div>
              </div>
               )}
              <CustomNavLink href="/dashboard" >
                <ProfileCard>
                  <img src={User1} alt="" className="w-full h-full object-cover" />
                </ProfileCard>
              </CustomNavLink>
              </ShowOnLogin>
           
             
          
             
          </div>

           <div className={`icon flex items-center justify-center gap-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                <button onClick={toggleMenu} className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none">
                  {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
            </div>
          
        </div>

          
           {/* Responsive Menu if below 768px */}
           
           <div ref={menuRef} className={`lg:hidden w-full p-5 absolute right-0 top-full menu-container ${isOpen ? "open" : "closed"}`}>
              {menuLists.map((list) => (
                <li key={list.id} className="uppercase list-none">
                  <CustomNavLink href={list.path} className={`${location.pathname === list.path ? 'text-green' : 'text-white'}`} onClick={()=> setIsOpen(false)}>
                    {list.link}
                  </CustomNavLink>
                </li>
              ))}
              <li  className={`uppercase list-none ${location.pathname === '/login' ? 'text-green' : 'text-white'}`} >
                <NavLink to={'/login'} onClick={()=> setIsOpen(false)}>Login</NavLink>
              </li>
              <li  className={`uppercase list-none ${location.pathname === '/register' ? 'text-green' : 'text-white'}`}>
               <NavLink to={'/register'} onClick={()=> setIsOpen(false)}>SignUp</NavLink>
              </li>
              <li  className={`uppercase list-none ${location.pathname === '/seller/login' ? 'text-green' : 'text-white'}`}>
               <NavLink to={'/seller/login'} onClick={()=> setIsOpen(false)}>Become a seller</NavLink>
              </li>
              <li  className={`uppercase list-none ${location.pathname === '/dashboard' ? 'text-green' : 'text-white'}`}>
               <NavLink to={"/dashboard"} onClick={()=> setIsOpen(false)}>Dashboard</NavLink>  {/**only if admin */}
              </li>
               <li className="uppercase list-none text-white" >Logout</li>
            </div>

         
      </nav>
    </Container>
   </header>
  )
}
