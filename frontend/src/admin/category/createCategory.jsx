import { Caption, PrimaryButton, Title } from "../../router/index";
import { commonClassNameOfInput } from "../../components/common/Design";
import { UseRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createCategory, getallCategory } from "../../redux/features/categorySlice";

export const CreateCategory = () => {

   UseRedirectLogoutUser('/login')

   const dispatch=useDispatch()
   const navigate=useNavigate()

   const [title, setTitle] = useState('')
   const [error,setError]=useState('')

   const handleInputChange =(e)=>{
       setTitle(e.target.value)
   };

   const handleSubmit = async(e)=> {
     e.preventDefault()

     try {
      setError('')

      await dispatch(createCategory({ title })).unwrap();  //.unwrap() converts rejected responses into thrown errors.
       await dispatch(getallCategory()).unwrap();

      navigate('/category')
       
     } catch (error) {
       setError('Failed to create category! please Try again..')
     }
   }

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Category
        </Title>
        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" value={title} className={`${commonClassNameOfInput}`} placeholder="Title" required onChange={handleInputChange} />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};