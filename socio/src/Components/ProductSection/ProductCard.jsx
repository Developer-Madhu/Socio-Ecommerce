import { useState } from "react";

function FlipCard({ frontContent, backContent, className = "", onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  };

  return (
    <div
      className={`relative w-[300px] h-[400px] cursor-pointer [perspective:1000px] ${className}`}
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          {frontContent}
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </div>
    </div>
  );
}

// Mock product data
const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "$149.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    details:
      "Experience ultimate comfort with the new Air Max design. Perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: "$179.99",
    image: "https://images.unsplash.com/photo-1603808033192-1b3a356b9dba",
    details:
      "Boost your performance with Adidas Ultraboost – engineered for superior comfort and speed.",
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1595341888016-c6873ef9b472",
    details:
      "Retro style meets modern performance. Puma RS-X delivers durability and bold design.",
  },
  {
    id: 4,
    name: "New Balance 327",
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1607083207630-a0e05c82b56d",
    details:
      "Classic meets contemporary in the New Balance 327. A must-have for sneaker lovers.",
  },
];

export default function ProductCard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">New Arrivals!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((product) => (
          <FlipCard
            key={product.id}
            frontContent={
              <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-48 object-contain mb-4"
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.price}</p>
              </div>
            }
            backContent={
              <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <p className="text-gray-600 text-center mb-4">{product.details}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
