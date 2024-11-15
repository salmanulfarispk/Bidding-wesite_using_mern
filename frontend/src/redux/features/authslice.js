import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import authService from '../services/authFeature'
import {toast } from 'react-toastify'


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
   users:[],
   isError: false,
   isSuccess: false,
   isLoggedIn: !!localStorage.getItem('user'),   //If the 'user' key does not exist, it returns null.
   isLoading: false,
   income: null,
   message: '',
};


  export const register= createAsyncThunk('auth/register',async(userData, thunkAPI) => {
     try {
      
      const response= await authService.register(userData);
      localStorage.setItem('user',JSON.stringify(response))
      return response;

     } catch (error) {
        const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
         return thunkAPI.rejectWithValue(errorMessage)
     }
  });

  export const login= createAsyncThunk('auth/login',async(userData, thunkAPI) => {
    try {
     
     const response= await authService.login(userData);
     localStorage.setItem('user',JSON.stringify(response))
     return response;

    } catch (error) {
       const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
        return thunkAPI.rejectWithValue(errorMessage)
    }
 });


 export const logOut= createAsyncThunk('auth/logOut',async(_,thunkAPI) => {
  try {
   
    await authService.logout();
    localStorage.removeItem('user')
    

    setTimeout(()=>{
    window.location.reload();
    },1000)

  } catch (error) {
     const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const getLogInstatus= createAsyncThunk('auth/status',async(_,thunkAPI) => {
  try {
     
    return await authService.getLogInStatus();
  
   } catch (error) {
      const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
       return thunkAPI.rejectWithValue(errorMessage)
   }
});


export const getuserProfile= createAsyncThunk('auth/userprofile',async(_,thunkAPI) => {
  try {
     
    return await authService.getUserProfile();
  
   } catch (error) {
      const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
       return thunkAPI.rejectWithValue(errorMessage)
   }
});


export const loginAsSeller= createAsyncThunk('auth/loginAsSeller',async(userData, thunkAPI) => {
  try {
   
   const response= await authService.loginUserAsSeller(userData);
   localStorage.setItem('user',JSON.stringify(response))
   return response;

  } catch (error) {
     const errorMessage= (error.response && error.response.data && error.response.data.message) || error.message || error.toString() || error ;
      return thunkAPI.rejectWithValue(errorMessage)
  }
});


export const getuserBalance= createAsyncThunk('auth/userBalance',async(_,thunkAPI) => {
  try {
     
    return await authService.getUserBalance();
  
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
    state.user = null ;
    state.isLoggedIn= false;
    toast.success(action.payload)
  })

  .addCase(logOut.rejected, (state,action)=>{
   state.isLoading = false ;
   state.isError= true ;
   state.message = action.payload ;
   state.user = null ;
   toast.error(action.payload)
 })


 //loginstatus

 .addCase(getLogInstatus.pending, (state)=>{
  state.isLoading = true ;
})

.addCase(getLogInstatus.fulfilled, (state,action)=>{
  state.isLoading = false ;
  state.isSuccess= true ;
  state.isLoggedIn= action.payload;
})

.addCase(getLogInstatus.rejected, (state,action)=>{
 state.isLoading = false ;
 state.isError= true ;
 state.message = action.payload ;
})

//userprofile

.addCase(getuserProfile.pending, (state)=>{
  state.isLoading = true ;
})

.addCase(getuserProfile.fulfilled, (state,action)=>{
  state.isLoading = false ;
  state.isSuccess= true ;
  state.isLoggedIn= true ;
  state.user= action.payload;
  localStorage.setItem('user', JSON.stringify(action.payload))
})

.addCase(getuserProfile.rejected, (state,action)=>{
 state.isLoading = false ;
 state.isError= true ;
 state.message = action.payload ;
 localStorage.removeItem('user');
 state.isLoggedIn= true ;

})


//loginAsSeller

.addCase(loginAsSeller.pending, (state)=>{
  state.isLoading = true ;
})

.addCase(loginAsSeller.fulfilled, (state,action)=>{
  state.isLoading = false ;
  state.isSuccess= true ;
  state.user = action.payload ;
  state.isError= false ;
  toast.success('you become a seller');
})

.addCase(loginAsSeller.rejected, (state,action)=>{
 state.isLoading = false ;
 state.isError= true ;
 state.message = action.payload ;
 state.user = null ;
 toast.error(action.payload);

})


// getuserbalace or getuserIncome


.addCase(getuserBalance.pending, (state)=>{
  state.isLoading = true ;
})

.addCase(getuserBalance.fulfilled, (state,action)=>{
  state.isLoading = false ;
  state.isSuccess= true ;
  state.isLoggedIn= true ;
  state.income= action.payload;
})

.addCase(getuserBalance.rejected, (state,action)=>{
 state.isLoading = false ;
 state.isError= true ;
 state.message = action.payload ;
 state.isLoggedIn= true ;

})



  },
});



export const { RESET } = authslice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn 
export const selectUser = (state ) => state.auth.user
export const selectIssuccess = (state) => state.auth.isSuccess

 

export default authslice.reducer