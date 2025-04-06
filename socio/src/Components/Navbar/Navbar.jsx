import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingCart,
  Package,
  LogOut,
  Store,
  Settings,
  Info,
  Phone
} from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (token && user) {
        setIsLoggedIn(true);
        setUserName(user.name || 'User');
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:3000/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUserName('');
      setShowDropdown(false);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBecomeSeller = () => {
    setShowDropdown(false);
    navigate('/seller/register');
  };

  const handleSettings = () => {
    setShowDropdown(false);
    navigate('/settings');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center">
              <span className="bg-indigo-600 text-white rounded-lg px-2 py-1 mr-2">S</span>
              <span>ocio</span>
            </Link>
          </div>

          {/* Centered Nav Links */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <Link to="/shop" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Link>
            </div>
          )}

          {/* Right Side: Auth/Dropdown */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <div className="relative user-dropdown">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none group"
                  aria-label="User menu"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 transition-all shadow-sm">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="hidden md:block font-medium text-gray-700">
                    {userName}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 divide-y divide-gray-100"
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {JSON.parse(localStorage.getItem('user'))?.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/shop"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-3 text-indigo-500" />
                          Shop
                        </Link>
                        <Link
                          to="/cart"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Package className="w-4 h-4 mr-3 text-indigo-500" />
                          Cart
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Package className="w-4 h-4 mr-3 text-indigo-500" />
                          Orders
                        </Link>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleSettings}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3 text-indigo-500" />
                          Settings
                        </button>
                        <button
                          onClick={handleBecomeSeller}
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                        >
                          <Store className="w-4 h-4 mr-3 text-indigo-500" />
                          Become a Seller
                        </button>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-gray-50 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          {isLoading ? 'Logging out...' : 'Logout'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/auth/register"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-indigo-600 hover:text-indigo-700 focus:outline-none transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
