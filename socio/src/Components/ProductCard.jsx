import { useRef } from 'react';
import { Star, Bookmark } from 'lucide-react';
import ProductActions from './ProductActions';
import { cn } from '../libs/utils.js';

const ProductCard = ({ 
  product, 
  onLike, 
  onAddToCart, 
  isLast = false, 
  observerRef 
}) => {
  const cardRef = useRef(null);

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div 
      ref={isLast ? observerRef : null}
      className="snap-start flex-shrink-0 w-full h-[calc(100vh-80px)] bg-white overflow-hidden relative"
    >
      <div className="relative w-full h-full">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/50" />

        {/* Product Actions (Like, Cart, Share) */}
        <ProductActions 
          product={product} 
          onLike={onLike} 
          onAddToCart={onAddToCart} 
        />

        {/* Product Details at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            {/* Brand and Bookmark */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-purple-600">{product.brand}</span>
              {discountPercentage && (
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
            
            {/* Product Name */}
            <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  size={16} 
                  className={cn(
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                    "inline-block"
                  )}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-medium text-gray-800">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;