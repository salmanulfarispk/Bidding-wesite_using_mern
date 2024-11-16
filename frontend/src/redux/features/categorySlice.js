import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryService from '../services/categoryService';
import {toast } from 'react-toastify'


const initialState = {
  categorys:[],
  category: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const createCategory = createAsyncThunk('category/create', async(formData, thunkAPI)=>{
    try {

       return await categoryService.createCategory(formData)
      
    } catch (error) {
      const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
    }
});


export const getallCategory = createAsyncThunk('category/Allcategory', async(_, thunkAPI)=>{
  try {

     return await categoryService.getAllcategory()
    
  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const DeleteCategory = createAsyncThunk('category/delete', async(id, thunkAPI)=>{
  try {

     return await categoryService.deleteCategory(id)
    
  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async({id,formData}, thunkAPI)=>{
  try {

     return await categoryService.EditCategory(id,formData)
    
  } catch (error) {
    const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
    return thunkAPI.rejectWithValue(errorMessage)
  }
});




const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder
    .addCase(createCategory.pending, (state)=>{
       state.isLoading= true ;
    })

    .addCase(createCategory.fulfilled, (state, action)=> {
      state.isLoading= false ;
      state.isSuccess= true ;
      state.isError= false ;
      toast.success('category has been created!')
    })

    .addCase(createCategory.rejected , (state, action)=>{
      state.isLoading = false ;
      state.isError = true ;
      state.message = action.payload ;
      toast.error(action.payload)
    })
    
    //get All category
    
    .addCase(getallCategory.pending, (state)=>{
      state.isLoading= true ;
   })

   .addCase(getallCategory.fulfilled, (state, action)=> {
     state.isLoading= false ;
     state.isSuccess= true ;
     state.isError= false ;
     state.categorys = action.payload ;
   })

   .addCase(getallCategory.rejected , (state, action)=>{
     state.isLoading = false ;
     state.isError = true ;
     state.message = action.payload ;
     toast.error(action.payload)
   })

   //delete
 .addCase(DeleteCategory.pending, (state)=>{
    state.isLoading= true ;
   })

 .addCase(DeleteCategory.fulfilled, (state, action)=> {
   state.isLoading= false ;
   state.isSuccess= true ;
   state.isError= false ;
   toast.success('Category has been deleted!')
 })

 .addCase(DeleteCategory.rejected , (state, action)=>{
   state.isLoading = false ;
   state.isError = true ;
   state.message = action.payload ;
   toast.error(action.payload)
 })

 //update-category
 .addCase(updateCategory.pending, (state)=>{
  state.isLoading= true ;
 })

.addCase(updateCategory.fulfilled, (state, action)=> {
 state.isLoading= false ;
 state.isSuccess= true ;
 state.isError= false ;
 toast.success('Category has been updated!')
})

.addCase(updateCategory.rejected , (state, action)=>{
 state.isLoading = false ;
 state.isError = true ;
 state.message = action.payload ;
 toast.error(action.payload)
})

  }
});



export default categorySlice.reducer