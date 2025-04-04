import { useState } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { toast } from 'sonner';

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

  return (
    <div className="h-full relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="fixed top-6 left-6 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
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
            <ProductCard
              key={product.id}
              product={currentProduct}
              onLike={handleLike}
              onAddToCart={handleAddToCart}
              isLast={isLast}
              observerRef={isLast ? lastElementRef : undefined}
            />
          );
        })}
        
        {/* Loading indicator */}
        {loading && (
          <div className="w-full py-10 flex justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
          </div>
        )}
        
        {/* No results */}
        {!loading && visibleItems.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReel;