import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const PRODUCT_URL= `${backendUrl}/product/`




const createProduct= async(formData)=>{
    
    const response=await axios.post(PRODUCT_URL , formData) 
    return response.data;
};





const productService ={
    createProduct,
   
}

export default productService;
