import { Loader, Title } from "../../router/index";
import { Table } from "../../components/Table";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProduct } from "../../redux/features/ProductSlice";


export const AdminProductList = () => {

    UseRedirectLogoutUser('/')

    const dispatch= useDispatch()
    const { products ,isLoading}=useSelector((state)=> state.product)

    useEffect(()=>{
      dispatch(getAllProduct()) 
    },[dispatch])


     if(isLoading){
        return <Loader />
     }

     if(products?.length === 0 ){
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
        </div>
        <hr className="my-5" />
        <Table products={products}/>
      </section>
    </>
  );
};