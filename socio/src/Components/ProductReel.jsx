import { useState, useEffect } from 'react';
import { Filter, Heart, ShoppingCart, Star, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import FilterSidebar from './FilterSidebar';

export const ProductReel = ({ filterProducts }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productState, setProductState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from database
  useEffect(() => {
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
        console.log('Fetched products:', data); // Debug log
        
        // Transform the data to include required fields
        const transformedProducts = data.map(product => ({
          id: product._id || product.id, // Handle both MongoDB _id and regular id
          name: product.name,
          price: parseFloat(product.price),
          category: product.category,
          description: product.description || 'No description available',
          image: product.image,
          stock: product.stock,
          rating: product.rating || 4.5,
          isLiked: false,
          isInCart: false
        }));

        console.log('Transformed products:', transformedProducts); // Debug log
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
        setProductState(transformedProducts);
        toast.success(`Loaded ${transformedProducts.length} products`);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle applying filters
  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
    const newFilteredProducts = filterProducts(products, filters);
    setFilteredProducts(newFilteredProducts);
    toast(`Showing ${newFilteredProducts.length} products`);
  };

  // Handle liking a product
  const handleLike = (id) => {
    setProductState(prevState => {
      const updatedProducts = prevState.map(product =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      );
      
      const product = updatedProducts.find(p => p.id === id);
      if (product) {
        toast(product.isLiked ? `Added ${product.name} to favorites` : `Removed ${product.name} from favorites`);
      }
      
      return updatedProducts;
    });
  };

  // Handle adding a product to cart
  const handleAddToCart = (id) => {
    setProductState(prevState => {
      const updatedProducts = prevState.map(product =>
        product.id === id ? { ...product, isInCart: !product.isInCart } : product
      );
      
      const product = updatedProducts.find(p => p.id === id);
      if (product) {
        toast(
          product.isInCart ? `Added ${product.name} to cart` : `Removed ${product.name} from cart`,
          {
            description: product.isInCart ? `$${product.price.toFixed(2)}` : undefined,
          }
        );
      }
      
      return updatedProducts;
    });
  };

  const handleShare = (product) => {
    toast(`Shared ${product.name}`);
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-gray-400 border-t-white animate-spin"></div>
          <p className="text-white">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] relative bg-black">
      {/* Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="fixed top-24 left-6 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Open filters"
      >
        <Filter size={20} />
      </button>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={currentFilters}
      />

      {/* Products Reel */}
      <div className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        {filteredProducts.map((product) => {
          // Find the current state of this product
          const currentProduct = productState.find(p => p.id === product.id);
          if (!currentProduct) return null; // Skip if product not found
          
          return (
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[calc(100vh-4rem)] snap-start relative"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x1200?text=Product+Image';
                }}
              />
              
              {/* Right Side Action Buttons */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLike(currentProduct.id)}
                  className={`p-3 rounded-full ${
                    currentProduct.isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  } transition-colors duration-200`}
                >
                  <Heart className={`w-6 h-6 ${currentProduct.isLiked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(currentProduct.id)}
                  className={`p-3 rounded-full ${
                    currentProduct.isInCart
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  } transition-colors duration-200`}
                >
                  <ShoppingCart className={`w-6 h-6 ${currentProduct.isInCart ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare(currentProduct)}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white text-xl font-semibold truncate max-w-[70%]">{currentProduct.name}</h3>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-white">{currentProduct.rating}</span>
                  </div>
                </div>
                <p className="text-white text-lg font-bold mb-4">${currentProduct.price.toFixed(2)}</p>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">{currentProduct.description}</p>
                <p className="text-white/60 text-xs">Stock: {currentProduct.stock} units</p>
              </div>
            </motion.div>
          );
        })}

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold mb-2 text-white">No products found</h3>
              <p className="text-gray-300">Try adjusting your filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReel; 