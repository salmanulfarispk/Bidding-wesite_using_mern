import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getallCategory } from "../../redux/features/categorySlice";
import { Loader } from "./Loader";

export const CategoryDropDown = (props) => {

  const dispatch=useDispatch()
  const { categorys,isLoading }=useSelector(state => state.category)

  useEffect(()=>{
     dispatch(getallCategory())
  },[dispatch])


   const allCategory= categorys?.map((category)=>{
      return {
        label: category?.title,
        value: category?._id
      }
   });

   const handleChange =(selectedOption)=>{
    props.onChange(selectedOption)
   }
     
  return (
    <>
       { isLoading ? <Loader /> :
       <Select id="category" 
       onChange={handleChange}   // Updates parent state when a new category is selected
       options={allCategory}  // List of categories
       value={props.value}    // Currently selected category
       /> }
      
    </>
  );
};