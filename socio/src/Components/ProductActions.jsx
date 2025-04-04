import { useState } from 'react';
import { Heart, ShoppingCart, Share, Info } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "../Components/ui/button";

const ProductActions = ({ product, onLike, onAddToCart }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };

  return (
    <div className="absolute right-4 bottom-24 flex flex-col gap-4">
      <button 
        onClick={() => onLike(product.id)}
        className={`action-button ${product.isLiked ? 'action-button-active' : ''}`}
        aria-label="Like product"
      >
        <Heart 
          size={24} 
          className={`${product.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} 
        />
      </button>

      <button 
        onClick={() => onAddToCart(product.id)}
        className={`action-button ${product.isInCart ? 'action-button-active' : ''}`}
        aria-label="Add to cart"
      >
        <ShoppingCart 
          size={24} 
          className={`${product.isInCart ? 'fill-purple-500 text-purple-500' : 'text-gray-700'}`} 
        />
      </button>

      <button 
        onClick={handleShare}
        className="action-button"
        aria-label="Share product"
      >
        <Share size={24} className="text-gray-700" />
      </button>

      <button 
        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        className={`action-button ${isDescriptionOpen ? 'action-button-active' : ''}`}
        aria-label="Product information"
      >
        <Info size={24} className={`${isDescriptionOpen ? 'text-purple-500' : 'text-gray-700'}`} />
      </button>
      
      {isDescriptionOpen && (
        <div className="absolute right-16 bottom-0 w-64 bg-white p-4 rounded-lg shadow-lg animate-fade-in">
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <Button 
            onClick={() => onAddToCart(product.id)}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="sm"
          >
            {product.isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductActions;