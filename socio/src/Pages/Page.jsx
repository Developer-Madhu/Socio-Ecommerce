import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, TrendingUp, Shield, Truck, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const Page = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero section images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
      alt: "Fashion Shopping"
    },
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
      alt: "Electronics"
    },
    {
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200",
      alt: "Lifestyle"
    },
    {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200",
      alt: "Technology"
    }
  ];

  // Add this after your existing state variables
  const trendingProducts = [
    {
      _id: 't1',
      name: 'Limited Edition Smart Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
      description: 'Latest generation smartwatch with health tracking',
      trending: true,
      badge: 'Hot Deal',
      discount: '20% OFF',
      soldCount: 156
    },
    {
      _id: 't2',
      name: 'Wireless Noise Cancelling Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      description: 'Premium sound quality with active noise cancellation',
      trending: true,
      badge: 'Best Seller',
      discount: '15% OFF',
      soldCount: 243
    },
    {
      _id: 't3',
      name: 'Premium Leather Backpack',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      description: 'Handcrafted genuine leather backpack',
      trending: true,
      badge: 'New Arrival',
      soldCount: 89
    },
    {
      _id: 't4',
      name: 'Designer Sunglasses',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
      description: 'UV protection with premium design',
      trending: true,
      badge: 'Trending',
      discount: '10% OFF',
      soldCount: 178
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Error loading products');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Auto slide images
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'beauty', name: 'Beauty' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "tween",
                duration: 0.8,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 mix-blend-multiply z-10" />
              <img
                src={heroImages[currentImageIndex].url}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
            >
              Discover Amazing Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-white drop-shadow-md"
            >
              Shop the latest trends with exclusive deals
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/shop"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full ${
                index === currentImageIndex 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 rounded-lg bg-gray-50"
            >
              <Truck className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your products delivered within 2-3 business days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-lg bg-gray-50"
            >
              <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment with multiple options</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6 rounded-lg bg-gray-50"
            >
              <RefreshCw className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for all products</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 pb-4 min-w-full">
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="animate-pulse flex-shrink-0 w-[300px]">
                      <div className="bg-gray-200 h-64 rounded-lg"></div>
                      <div className="mt-4 space-y-2">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-[1.02]"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-[200px] object-cover"
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Heart className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < product.rating ? 'fill-current' : ''
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 ml-2">({product.reviews})</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-blue-600">
                            ${product.price}
                          </span>
                          <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Scroll Indicators */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
              <button 
                className="p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-all transform hover:scale-110"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
              <button 
                className="p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-all transform hover:scale-110"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto');
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trending Now
              </h2>
              <p className="text-gray-600 mt-2">Discover what's hot right now</p>
            </div>
            <Link
              to="/trending"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
            >
              View All
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {product.badge}
                  </span>
                </div>

                {/* Discount Tag */}
                {product.discount && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                      {product.discount}
                    </span>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      {product.discount && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.soldCount} sold
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Progress Bar for Sales */}
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min((product.soldCount / 300) * 100, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {300 - product.soldCount} items left
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* After Trending Section, add CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Join Our Newsletter
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/90 mb-8"
              >
                Subscribe to get special offers, free giveaways, and amazing deals.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 w-full max-w-md"
            >
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Socio</h3>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for trending products and amazing deals.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Links */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trending</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Shopping Street, NY 10001
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@socio.com
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 234 567 890
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 Socio. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page; 