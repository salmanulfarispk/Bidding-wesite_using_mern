import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authslice'
import categoryReducer from './features/categorySlice'
import  productReducer from './features/ProductSlice'





export const store = configureStore({
    reducer:{
        auth: authReducer,
        category: categoryReducer,
        product: productReducer
    }
});