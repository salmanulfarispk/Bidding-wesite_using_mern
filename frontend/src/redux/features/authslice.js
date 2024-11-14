import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import authService from '../services/authFeature'
import {toast } from 'react-toastify'


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
   users:[],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: ''
};


  export const register= createAsyncThunk('auth/register',async(userData, thunkAPI) => {
     try {
      
      const response= await authService.register(userData);
      localStorage.setItem('user',JSON.stringify(response))
     } catch (error) {
        const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
         return thunkAPI.rejectWithValue(errorMessage)
     }
  });

  export const login= createAsyncThunk('auth/login',async(userData, thunkAPI) => {
    try {
     
     const response= await authService.login(userData);
     localStorage.setItem('user',JSON.stringify(response))
    } catch (error) {
       const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
        return thunkAPI.rejectWithValue(errorMessage)
    }
 });


 export const logOut= createAsyncThunk('auth/logOut',async(thunkAPI) => {
  try {
   
    await authService.logout();
    localStorage.removeItem('user')
  } catch (error) {
     const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const logOutUserStatus= createAsyncThunk('auth/logOutStatus',async(thunkAPI) => {
  try {
   
    await authService.logout();
    localStorage.removeItem('user')
  } catch (error) {
     const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
  }
});


const authslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false ;
      state.isSuccess = false ;
      state.isLoading = false ;
      state.message = '' ;
    }
  },
  extraReducers: (builder) => {
     builder
      .addCase(register.pending, (state)=>{
       state.isLoading = true ;
     })

     .addCase(register.fulfilled, (state,action)=>{
       state.isLoading = false ;
       state.isSuccess= true ;
       state.isLoggedIn=  true ;
       state.user = action.payload ;
     })

     .addCase(register.rejected, (state,action)=>{
      state.isLoading = false ;
      state.isError= true ;
      state.message = action.payload ;
      state.user = null ;
      toast.error(action.payload)
    })

  
    //login

    .addCase(login.pending, (state)=>{
      state.isLoading = true ;
    })

    .addCase(login.fulfilled, (state,action)=>{
      state.isLoading = false ;
      state.isSuccess= true ;
      state.isLoggedIn=  true ;
      state.user = action.payload ;
    })

    .addCase(login.rejected, (state,action)=>{
     state.isLoading = false ;
     state.isError= true ;
     state.message = action.payload ;
     state.user = null ;
   })

   //logoout

   .addCase(logOut.pending, (state)=>{
    state.isLoading = true ;
  })

  .addCase(logOut.fulfilled, (state,action)=>{
    state.isLoading = false ;
    state.isSuccess= true ;
    state.isLoggedIn=  true ;
    state.user = null ;
    toast.success(action.payload)
  })

  .addCase(logOut.rejected, (state,action)=>{
   state.isLoading = false ;
   state.isError= true ;
   state.message = action.payload ;
   state.user = null ;
   toast.error(action.payload)
 })


  }
});



export const { RESET } = authslice.actions

export default authslice.reducer