import React, { useEffect, useRef, useState } from 'react'
import { Container, CustomNavLink, CustomNavLinkList, ProfileCard } from './Design'
import { menuLists } from '../../assets/data'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom'
import {User1} from "../hero/Hero"
import { NavLink } from 'react-router-dom'
import { ShowOnLogin, ShowOnLogout } from '../../utils/HiddenLinks';



export const Header = () => {

  const [isOpen,setIsOpen]=useState(false)
  const [isScrolled,setIsScrolled]=useState(false)


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

 const role = "buyer";



  return (
   <header className={isHomePage ? `header py-1 bg-primary ${isScrolled ? 'scrolled' : ''} ` : `header bg-white shadow-s1 ${isScrolled? 'scrolled' : ''}`}>
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

          {role === "buyer" && (
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
            <CustomNavLink href="/dashboard">
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
               <li className="uppercase list-none text-white">Logout</li>
            </div>

         
      </nav>
    </Container>
   </header>
  )
}
