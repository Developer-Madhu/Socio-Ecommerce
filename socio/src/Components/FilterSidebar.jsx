import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Slider } from '../Components/ui/slider';
import { Checkbox } from '../Components/ui/checkbox';
import { getBrands, getCategories, getPriceRange } from '../data/products.js';

const FilterSidebar = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isBrandsExpanded, setIsBrandsExpanded] = useState(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  
  const brands = getBrands();
  const categories = getCategories();
  const [minPrice, maxPrice] = getPriceRange();
  
  // Initialize filters from current filters
  useEffect(() => {
    if (currentFilters.priceRange) {
      setPriceRange(currentFilters.priceRange);
    } else {
      setPriceRange([minPrice, maxPrice]);
    }
    
    if (currentFilters.brands) {
      setSelectedBrands(currentFilters.brands);
    }
    
    if (currentFilters.categories) {
      setSelectedCategories(currentFilters.categories);
    }
  }, [currentFilters, minPrice, maxPrice]);

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    });
    onClose();
  };

  const handleResetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className={`fixed top-0 left-0 bottom-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } overflow-auto`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Price Range Filter */}
        <div className="border-b pb-4">
          <button 
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setIsPriceExpanded(!isPriceExpanded)}
          >
            <span>Price Range</span>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${isPriceExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {isPriceExpanded && (
            <>
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                min={minPrice}
                max={maxPrice}
                step={10}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(values) => setPriceRange([values[0], values[1]])}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </>
          )}
        </div>
        
        {/* Brands Filter */}
        <div className="border-b pb-4">
          <button 
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setIsBrandsExpanded(!isBrandsExpanded)}
          >
            <span>Brands</span>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${isBrandsExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {isBrandsExpanded && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBrands([...selectedBrands, brand]);
                      } else {
                        setSelectedBrands(selectedBrands.filter(b => b !== brand));
                      }
                    }}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Categories Filter */}
        <div className="pb-4">
          <button 
            className="flex items-center justify-between w-full text-left font-medium mb-4"
            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
          >
            <span>Categories</span>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${isCategoriesExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {isCategoriesExpanded && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category]);
                      } else {
                        setSelectedCategories(selectedCategories.filter(c => c !== category));
                      }
                    }}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="sticky bottom-0 bg-white p-4 border-t flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
        <Button 
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;