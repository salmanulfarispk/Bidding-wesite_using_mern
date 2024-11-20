import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import biddingService from '../services/bidService';
import { toast } from 'react-toastify'


const initialState = {
 history:[],
 bidding: null,
 isError: false,
 isSuccess: false,
 isLoading: false,
 message: '',
}


export const placeBid = createAsyncThunk('bidding/place-bid', async({ productId, price}, thunkAPI)=>{
    try {

       return await biddingService.placeBid({ productId, price })
      
    } catch (error) {
      const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
    }
});


export const fetchBiddingHistory = createAsyncThunk('bidding/bid-history', async(productId, thunkAPI)=>{
    try {

       return await biddingService.fetchBiddingHistory(productId)
      
    } catch (error) {
      const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
    }
});

export const sellProductByUser = createAsyncThunk('bidding/sell-product', async(productId, thunkAPI)=>{
    try {

       return await biddingService.sellProductByUser(productId)
      
    } catch (error) {
      const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
    }
});





const biddingSlice = createSlice({
  name: 'bidding',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder 
    .addCase(placeBid.pending, (state)=>{
        state.isLoading= true ;
     })
 
     .addCase(placeBid.fulfilled, (state, action)=> {
       state.isLoading= false ;
       state.isSuccess= true ;
       state.isError= false ;
       state.message = action.payloadoad; 
       toast.success('Apply success!')
     })
 
     .addCase(placeBid.rejected , (state, action)=>{
       state.isLoading = false ;
       state.isError = true ;
       state.message = action.payload ;
      
     })

     //sell products

     .addCase(sellProductByUser.pending, (state)=>{
        state.isLoading= true ;
     })
 
     .addCase(sellProductByUser.fulfilled, (state, action)=> {
       state.isLoading= false ;
       state.isSuccess= true ;
       state.isError= false ;
       state.message = action.payload; 
     })
 
     .addCase(sellProductByUser.rejected , (state, action)=>{
       state.isLoading = false ;
       state.isError = true ;
       state.message = action.payload ;
      
     })

     //bid history
       
     .addCase(fetchBiddingHistory.pending, (state)=>{
        state.isLoading= true ;
     })
 
     .addCase(fetchBiddingHistory.fulfilled, (state, action)=> {
       state.isLoading= false ;
       state.isSuccess= true ;
       state.isError= false ;
       state.history =action.payload;
     })
 
     .addCase(fetchBiddingHistory.rejected , (state, action)=>{
       state.isLoading = false ;
       state.isError = true ;
       state.message = action.payload ;
      
     })

  }
});



export default biddingSlice.reducer