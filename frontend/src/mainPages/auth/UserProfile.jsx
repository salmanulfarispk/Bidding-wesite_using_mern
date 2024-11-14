import React, { useEffect } from "react";
import { Caption, Title } from "../../router/index";
import { User2 } from "../../components/hero/Hero";
import { commonClassNameOfInput } from "../../components/common/Design";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { getuserProfile } from "../../redux/features/authslice";

export const UserProfile = () => {

  UseRedirectLogoutUser('/login')

  const {user}=useSelector(state => state.auth)
  const dispatch=useDispatch()
 

  useEffect(()=>{
    dispatch(getuserProfile())
  },[dispatch])

  

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="profile flex flex-col md:flex-row items-center gap-8">
          <img src={user?.photo || User2} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <Title level={5} className="capitalize">
              {user.name}
            </Title>
            <Caption>{user.email}</Caption>
          </div>
        </div>
        <form>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-full">
              <Caption className="mb-2">Full Name </Caption>
              <input type="search" value={user.name} className={`capitalize ${commonClassNameOfInput}`} readOnly />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 mt-10">
            <div className="w-full md:w-1/2">
              <Caption className="mb-2">Contact Number</Caption>
              <input type="search" className={commonClassNameOfInput} placeholder="Contact Number" />
            </div>
            <div className="w-full md:w-1/2">
              <Caption className="mb-2">Email</Caption>
              <input type="search" value={user?.email} className={commonClassNameOfInput} disabled />
            </div>
          </div>
          <div className="my-8">
            <Caption className="mb-2">Role</Caption>
            <input type="search" value={user?.role} className={commonClassNameOfInput} />
          </div>
          <div className="my-8">
            <Caption className="mb-2">Profile Picture</Caption>
            <input type="search" className={commonClassNameOfInput} placeholder="Working" required />
          </div>
          <button className='text-white bg-green font-medium rounded-full text-md px-7 py-2 md:text-lg md:px-16 md:py-3 hover:bg-primary transition ease-in-out'>Update Profile</button>
        </form>
      </section>
    </>
  );
};