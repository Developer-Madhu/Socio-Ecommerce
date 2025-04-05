import { useState, useEffect } from 'react';
// import ProductReel from '@/Components/ProductReel';
import ProductReel from './ProductReel';

const Index = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch products from the database
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/products', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      // Transform the data to match the ProductReel component's expected format
      const transformedProducts = data.map(product => ({
        ...product,
        rating: product.rating || 4.5,
        isLiked: false,
        isInCart: false,
        description: product.description || 'No description available'
      }));

      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to filter products (you can customize this based on your needs)
  const filterProducts = (productList, filters) => {
    return productList.filter(product => {
      if (filters.priceRange && 
          (product.price < filters.priceRange[0] || 
           product.price > filters.priceRange[1])) {
        return false;
      }
      
      if (filters.categories && 
          filters.categories.length > 0 && 
          !filters.categories.includes(product.category)) {
        return false;
      }
      
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
          </div>
        ) : (
          <ProductReel products={products} filterProducts={filterProducts} />
        )}
      </div>
    </div>
  );
};

export default Index;