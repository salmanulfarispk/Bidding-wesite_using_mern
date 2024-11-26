import { useEffect, useState } from "react";
import Select from "react-select";
import { Loader } from "./Loader";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const CATEGORY_URL= `${backendUrl}/category/`
import axios from 'axios'


export const CategoryDropDown = (props) => {

 const [Allcategory,setAllCategory]=useState([])
 const [isLoading,setLoading]=useState(true)


  const getAllcategory= async()=>{
    const response=await axios.get(CATEGORY_URL + 'all-categorys')
    if(response.data){
      setAllCategory(response.data)
      setLoading(false)
    }
    return response.data;
  };

  useEffect(()=>{
      getAllcategory()
  },[])


   const allCategory= Allcategory?.map((category,index)=>{
      return {
        label: category,
        value: index,
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