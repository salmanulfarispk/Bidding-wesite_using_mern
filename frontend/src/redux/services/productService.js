import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const PRODUCT_URL= `${backendUrl}/product/`




const createProduct= async(formData)=>{
    const response=await axios.post(CATEGORY_URL , formData)
    return response.data.data;
};





const productService ={
    createProduct,
   
}

export default productService;
