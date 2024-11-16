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

const EditCategory= async(id, formData)=>{
    const response=await axios.put(`${CATEGORY_URL}/${id}`,formData)
    return response.data;
};

const deleteCategory= async(id)=>{
    const response=await axios.delete(`${CATEGORY_URL}/${id}`)
    return response.data;
};





const categoryService ={
   createCategory,
   getAllcategory,
   deleteCategory,
   EditCategory
}

export default categoryService;
