import React from 'react'
import {Hero,CategorySlider,ProductList, TopSeller, Process} from '../../router/index.js'


export const Home = () => {
  return (
    <div>

        <Hero />
        <CategorySlider />
        <ProductList />
        <TopSeller />
        <Process />

    </div>
  )
}
