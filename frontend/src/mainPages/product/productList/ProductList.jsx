import React, { useEffect } from "react";
import { PrimaryButton, Title,Table, Loader } from "../../../router/index";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { UseRedirectLogoutUser } from "../../../hooks/useRedirectLogoutUser";
import { deleteProduct, getAllUsersProduct } from "../../../redux/features/ProductSlice";

export const Productlist = () => {

  UseRedirectLogoutUser('/')
  const dispatch=useDispatch()
  const { user }=useSelector((state)=> state.auth)
  const { userproducts,isLoading } =useSelector((state) => state.product)
  
  useEffect(()=>{
    dispatch(getAllUsersProduct())
  },[dispatch])


  const handleDeleteProduct = async(id)=>{
     await dispatch(deleteProduct(id));
     await dispatch(getAllUsersProduct())
     
  }

  
  if(isLoading){
    return <Loader />
 }

 if(userproducts?.length === 0 ){
    return (
        <div className="flex justify-center h-auto w-auto">
            <h2 className="text-2xl text-gray-700"> No Products Found</h2>
        </div>
    )
 }


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
              <span>Create</span>
            </PrimaryButton>
          </NavLink>
          )}
        </div>
        <hr className="my-5" />

        <Table products={userproducts} delProduct={handleDeleteProduct}/>
      </section>
    </>
  );
};