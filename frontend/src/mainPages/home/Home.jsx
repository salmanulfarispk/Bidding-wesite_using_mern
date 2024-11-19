import React, { useEffect } from 'react'
import {Hero,CategorySlider, TopSeller, Process, Trust,Topcollection} from '../../router/index.js'
import {ProductList} from "../../components/hero/ProductList.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../redux/features/ProductSlice.js'

export const Home = () => {

  const dispatch=useDispatch()
   const { products }=useSelector((state)=> state.product)

   useEffect(()=>{
     dispatch(getAllProduct())
   },[dispatch])


  return (
    <div>

        <Hero />
        <CategorySlider />
        <ProductList products={products}/>
        <TopSeller />
        <Process />
        <Trust />
        <Topcollection />
        
    </div>
  )
}
