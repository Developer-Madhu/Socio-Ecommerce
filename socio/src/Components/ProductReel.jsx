import { useState } from 'react';
import { Filter, Heart, ShoppingCart, Star, Share2, MessageCircle } from 'lucide-react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import FilterSidebar from './FilterSidebar';

export const ProductReel = ({ products, filterProducts }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [productState, setProductState] = useState(products);

  // Use our custom infinite scroll hook
  const { 
    visibleItems, 
    lastElementRef, 
    loading, 
    hasMore,
    reset
  } = useInfiniteScroll(filteredProducts, { initialPageSize: 4 });

  // Handle applying filters
  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
    const newFilteredProducts = filterProducts(products, filters);
    setFilteredProducts(newFilteredProducts);
    reset();
    
    // Show toast with count of filtered products
    toast(`Showing ${newFilteredProducts.length} products`);
  };

  // Handle liking a product
  const handleLike = (id) => {
    const updatedProducts = productState.map((product) =>
      product.id === id
        ? { ...product, isLiked: !product.isLiked }
        : product
    );
    setProductState(updatedProducts);
    
    // Show toast message
    const product = productState.find(p => p.id === id);
    if (product) {
      const isLiked = !product.isLiked;
      toast(isLiked ? `Added ${product.name} to favorites` : `Removed ${product.name} from favorites`);
    }
  };

  // Handle adding a product to cart
  const handleAddToCart = (id) => {
    const updatedProducts = productState.map((product) =>
      product.id === id
        ? { ...product, isInCart: !product.isInCart }
        : product
    );
    setProductState(updatedProducts);
    
    // Show toast message
    const product = productState.find(p => p.id === id);
    if (product) {
      const isInCart = !product.isInCart;
      toast(
        isInCart ? `Added ${product.name} to cart` : `Removed ${product.name} from cart`,
        {
          description: isInCart ? `$${product.price.toFixed(2)}` : undefined,
        }
      );
    }
  };

  const handleShare = (product) => {
    toast(`Shared ${product.name}`);
    // Add actual share functionality here
  };

  return (
    <div className="h-[calc(100vh-4rem)] relative">
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
        {visibleItems.map((product, index) => {
          const currentProduct = productState.find(p => p.id === product.id) || product;
          const isLast = index === visibleItems.length - 1;
          
          return (
            <div
              key={product.id}
              ref={isLast ? lastElementRef : undefined}
              className="h-[calc(100vh-4rem)] snap-start relative"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
              
              {/* Right Side Action Buttons */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLike(currentProduct.id)}
                  className={`p-3 rounded-full ${
                    currentProduct.isLiked
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  } transition-colors duration-200`}
                >
                  <Heart className="w-6 h-6" />
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
                  <ShoppingCart className="w-6 h-6" />
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
                <p className="text-white text-lg font-bold mb-4">${currentProduct.price}</p>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">{currentProduct.description || 'No description available'}</p>
              </div>
            </div>
          );
        })}
        
        {/* Loading indicator */}
        {loading && (
          <div className="w-full py-10 flex justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-pink-500 animate-spin"></div>
          </div>
        )}
        
        {/* No results */}
        {!loading && visibleItems.length === 0 && (
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