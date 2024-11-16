import React from "react";
import { PrimaryButton, Title } from "../../../router/index";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

export const Productlist = () => {

  const {user}=useSelector((state)=> state.auth)

  
  


  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Product Lists
          </Title>
          {user.role !== 'buyer' && (
          <NavLink to="/add-product">
            <PrimaryButton className="flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105">
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </PrimaryButton>
          </NavLink>
          )}
        </div>
        <hr className="my-5" />
      </section>
    </>
  );
};