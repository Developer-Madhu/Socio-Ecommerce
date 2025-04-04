import { useState } from 'react';
// import ProductReel from '@/Components/ProductReel';
import { products, filterProducts } from '../data/products.js'
import ProductReel from './ProductReel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen">
        <ProductReel products={products} filterProducts={filterProducts} />
      </div>
    </div>
  );
};

export default Index;