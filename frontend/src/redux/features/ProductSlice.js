import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from '../services/productService';
import { toast } from 'react-toastify'



const initialState = {
  products:[],
  userproducts: [],
  wonedproducts:[],
  product:null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}



export const createProduct = createAsyncThunk('product/create', async(formData, thunkAPI)=>{
  try {

     return await productService.createProduct(formData)
    
  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});



const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
     builder 
    .addCase(createProduct.pending, (state)=>{
      state.isLoading= true ;
   })

   .addCase(createProduct.fulfilled, (state, action)=> {
     state.isLoading= false ;
     state.isSuccess= true ;
     state.isError= false ;
     state.products.push(action.payload)
     toast.success('product created succesfully!')
   })

   .addCase(createProduct.rejected , (state, action)=>{
     state.isLoading = false ;
     state.isError = true ;
     state.message = action.payload ;
     toast.error(action.payload)
   })

   //

  },
});



export default ProductSlice.reducer