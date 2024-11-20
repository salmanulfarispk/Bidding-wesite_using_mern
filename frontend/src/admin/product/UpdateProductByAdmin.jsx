import { Caption, Title } from "../../router/index";
import { commonClassNameOfInput, PrimaryButton } from "../../components/common/Design";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllProduct, updateProductByAdmin } from "../../redux/features/ProductSlice";

export const UpdateProductByAdmin = () => {


  UseRedirectLogoutUser('/login')
  const { id }=useParams()
   
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  const [commission,setCommission]=useState(0)

  const { isSuccess }=useSelector((state)=> state.product)


  const save =async(e)=>{
       e.preventDefault();

       const formData={
        commission,
       };

       await dispatch(updateProductByAdmin({formData,id}))
       await dispatch(getAllProduct())
        
       if(isSuccess){
        navigate('/product/admin')
       }
      };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Product
        </Title>
        <hr className="my-5" />
        <div className="create-product">
          <form onSubmit={save}>
            <div className="w-full">
              <Caption className="mb-2">Commission *</Caption>
              <input type="number" name="commission" value={commission} onChange={(e)=> setCommission(e.target.value)}  className={`${commonClassNameOfInput}`} />
            </div>
            <PrimaryButton type="submit" className="rounded-none my-5">
              Update
            </PrimaryButton>
          </form>
        </div>
      </section>
    </>
  );
};