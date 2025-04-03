import React from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import LeadGrid from './Components/Hero/LeadGrid'
import ProductCard from './Components/ProductSection/ProductCard'

const HomePage = () => {
  return (
    <div className='homepage'>
        <LeadGrid />
        <ProductCard />
    </div>
  )
}

export default HomePage