import axios from 'axios'


const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const BIDDING_URL= `${backendUrl}/bidding/`




const placeBid= async(formData)=>{
    
    const response=await axios.post(BIDDING_URL , formData) 
    return response.data;
};

const fetchBiddingHistory= async(id)=>{

    const response=await axios.get(`${BIDDING_URL}/${id}`) 
    return response.data;
};


const sellProductByUser= async(productId)=>{
    
    const response=await axios.post(`${BIDDING_URL}/sell}`,productId) 
    return response.data;
};




const biddingService ={
    placeBid,
    fetchBiddingHistory,
    sellProductByUser
 }
 
 export default biddingService;