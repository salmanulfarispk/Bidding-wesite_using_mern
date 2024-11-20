import React, { useEffect } from "react";
import { Table, Title } from "../../router/index";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllWonProductOfUser } from "../../redux/features/ProductSlice";

export const WinningBidList = () => {

    UseRedirectLogoutUser('/')

    const dispatch=useDispatch()
    const { wonedproducts}=useSelector((state)=> state.product)

    useEffect(()=>{
       dispatch(getAllWonProductOfUser())
    },[dispatch])



  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Winning Product Lists
          </Title>
        </div>
        <br />
        {wonedproducts && wonedproducts.length > 0 ? (
         <Table products={wonedproducts} isWon={true}/>
        ): 
           (
          <div className="text-center py-5">
          <p className="text-gray-500">No products found. Start by creating a new product!</p>
          </div>
          
        )}
      </section>
    </>
  );
};