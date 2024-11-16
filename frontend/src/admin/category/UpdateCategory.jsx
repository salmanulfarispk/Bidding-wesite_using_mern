import { PrimaryButton } from "../../router/index";
import { Caption, commonClassNameOfInput, Title } from "../../components/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getallCategory, updateCategory } from "../../redux/features/categorySlice";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useState } from "react";

export const UpdateCategory = () => {

  
  UseRedirectLogoutUser('/login')

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { id }=useParams()
  
  
  const [title, setTitle] = useState('')
   
  const { isSuccess }=useSelector(state => state.category)

   

   const handleSubmit = async(e)=> {
     e.preventDefault()

     const formData={
       title: title
     }
      
       await dispatch(updateCategory({ formData, id }))
       await dispatch(getallCategory())

       if(isSuccess){
        navigate('/category')
       }

    
   }


  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Category
        </Title>

        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" value={title} name="title" className={`${commonClassNameOfInput}`} onChange={(e)=> setTitle(e.target.value)}/>
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};