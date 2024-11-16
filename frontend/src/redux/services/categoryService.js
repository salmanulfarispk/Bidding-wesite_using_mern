import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const CATEGORY_URL= `${backendUrl}/category/`




const createCategory= async(formData)=>{
    const response=await axios.post(CATEGORY_URL , formData)
    return response.data;
};

const getAllcategory= async()=>{
    const response=await axios.get(CATEGORY_URL)
    return response.data;
};





const categoryService ={
   createCategory,
   getAllcategory,
}

export default categoryService;
