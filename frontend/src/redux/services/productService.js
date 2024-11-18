import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const PRODUCT_URL= `${backendUrl}/product`




const createProduct= async(formData)=>{
    
    const response=await axios.post(PRODUCT_URL , formData) 
    return response.data;
};

const getAllProduct= async()=>{
    
    const response=await axios.get(PRODUCT_URL) 
    
    return response.data;
};


const getAllProductsOfUser= async()=>{
    
    const response=await axios.get(`${PRODUCT_URL}/user`) 
    
    return response.data;
};

const getAllWonProductofUser= async()=>{
    
    const response=await axios.get(`${PRODUCT_URL}/won-products`) 
    
    return response.data;
};






const productService ={
    createProduct,
    getAllProduct,
    getAllProductsOfUser,
    getAllWonProductofUser,

   
}

export default productService;
