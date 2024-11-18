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


export const getAllUsersProduct = createAsyncThunk('product/getUsers-product', async(_, thunkAPI)=>{
  try {

     return await productService.getAllProductsOfUser()
    
  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const getAllProduct = createAsyncThunk('product/public/getAllProducts', async(_, thunkAPI)=>{
  try {

     return await productService.getAllProduct()
    
  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const getAllWonProductOfUser = createAsyncThunk('product/getwon-Products', async(_, thunkAPI)=>{
  try {
     return await productService.getAllWonProductofUser()

  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});



export const deleteProduct = createAsyncThunk('product/delete-Products', async(id, thunkAPI)=>{
  try {
     return await productService.deleteProduct(id)

  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const updateProduct = createAsyncThunk('product/update-Products', async({id,formData}, thunkAPI)=>{
  try {
     return await productService.updateProduct(id,formData)

  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});



export const getProduct = createAsyncThunk('product/public/getProduct', async(id, thunkAPI)=>{
  try {

     return await productService.getProduct(id);
    
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
     state.products.push(action.payload) ;
     toast.success('product created succesfully!')
   })

   .addCase(createProduct.rejected , (state, action)=>{
     state.isLoading = false ;
     state.isError = true ;
     state.message = action.payload ;
     toast.error(action.payload)
   })

   //getAllusersproduct

   .addCase(getAllUsersProduct.pending, (state)=>{
    state.isLoading= true ;
  })

 .addCase(getAllUsersProduct.fulfilled, (state, action)=> {
   state.isLoading= false ;
   state.isSuccess= true ;
   state.isError= false ;
   state.userproducts= action.payload ;
 })

 .addCase(getAllUsersProduct.rejected , (state, action)=>{
   state.isLoading = false ;
   state.isError = true ;
   state.message = action.payload ;
 })


    //getAllProducts

    .addCase(getAllProduct.pending, (state)=>{
      state.isLoading= true ;
    })
  
   .addCase(getAllProduct.fulfilled, (state, action)=> {
     state.isLoading= false ;
     state.isSuccess= true ;
     state.isError= false ;
     state.products= action.payload ;
   })
  
   .addCase(getAllProduct.rejected , (state, action)=>{
     state.isLoading = false ;
     state.isError = true ;
     state.message = action.payload ;
   })

   //get won porduct of user

   .addCase(getAllWonProductOfUser.pending, (state)=>{
    state.isLoading= true ;
  })

 .addCase(getAllWonProductOfUser.fulfilled, (state, action)=> {
   state.isLoading= false ;
   state.isSuccess= true ;
   state.isError= false ;
   state.wonedproducts= action.payload ;
 })

 .addCase(getAllWonProductOfUser.rejected , (state, action)=>{
   state.isLoading = false ;
   state.isError = true ;
   state.message = action.payload ;
 })


   //deleteProduct

  .addCase(deleteProduct.pending, (state)=>{
    state.isLoading= true ;
  })

 .addCase(deleteProduct.fulfilled, (state, action)=> {
   state.isLoading= false ;
   state.isSuccess= true ;
   state.isError= false ;
   toast.success('Product deleted succesfully!')
 })

 .addCase(deleteProduct.rejected , (state, action)=>{
   state.isLoading = false ;
   state.isError = true ;
   state.message = action.payload ;
   toast.error(action.payload)

 })


 //updateProduct
   
 .addCase(updateProduct.pending, (state)=>{
  state.isLoading= true ;
})

.addCase(updateProduct.fulfilled, (state, action)=> {
 state.isLoading= false ;
 state.isSuccess= true ;
 state.isError= false ;
 toast.success('Product updated succesfully!')
})

.addCase(updateProduct.rejected , (state, action)=>{
 state.isLoading = false ;
 state.isError = true ;
 state.message = action.payload ;
 toast.error(action.payload)

})


//get single product

.addCase(getProduct.pending, (state)=>{
  state.isLoading= true ;
})

.addCase(getProduct.fulfilled, (state, action)=> {
 state.isLoading= false ;
 state.isSuccess= true ;
 state.isError= false ;
 state.product= action.payload ;
})

.addCase(getProduct.rejected , (state, action)=>{
 state.isLoading = false ;
 state.isError = true ;
 state.message = action.payload ;
})

 //


  },
});



export const selectedProduct =(state)=> state.product.product;

export default ProductSlice.reducer