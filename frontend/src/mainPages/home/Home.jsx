import React from 'react'
import {Hero,CategorySlider, TopSeller, Process, Trust,Topcollection} from '../../router/index.js'
import {ProductList} from "../../components/hero/ProductList.jsx"

export const Home = () => {
  return (
    <div>

        <Hero />
        <CategorySlider />
        <ProductList />
        <TopSeller />
        <Process />
        <Trust />
        <Topcollection />
        
    </div>
  )
}
