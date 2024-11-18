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
    const response = await axios.post(`${PRODUCT_URL}/won-products`) 
    return response.data;
};


const deleteProduct= async(id)=>{
    
    const response=await axios.delete(`${PRODUCT_URL}/${id}`) 
    
    return response.data;
};

const getProduct= async(id)=>{
    
    const response=await axios.get(`${PRODUCT_URL}/${id}`) 
    
    return response.data;
};


const updateProduct= async(id,formData)=>{
    
    const response=await axios.put(`${PRODUCT_URL}/${id}`,formData) 
    
    return response.data;
};


const updateProductByAdmin= async(id,formData)=>{
    
    const response=await axios.patch(`${PRODUCT_URL}/admin/product-verified/${id}`,formData) 
    
    return response.data;
};



const deleteProductByAdmin= async(id)=>{
    
    const response=await axios.delete(`${PRODUCT_URL}/admin/products`,id) 
    
    return response.data;
};





const productService ={
    createProduct,
    getAllProduct,
    getAllProductsOfUser,
    getAllWonProductofUser,
    deleteProduct,
    updateProductByAdmin,
    updateProduct,
    getProduct,
    deleteProductByAdmin
   
}

export default productService;
