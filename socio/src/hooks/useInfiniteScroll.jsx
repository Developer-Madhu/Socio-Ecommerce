
import { useState, useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(
  items,
  options = {}
) {
  const { 
    threshold = 100,
    initialPageSize = 5
  } = options;
  
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  
  // Function to load more items
  const loadMoreItems = useCallback(() => {
    if (!hasMore || loading || items.length === 0) return;
    
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const nextItems = items.slice(
        currentIndex, 
        currentIndex + initialPageSize
      );
      
      if (nextItems.length > 0) {
        setVisibleItems(prev => [...prev, ...nextItems]);
        setCurrentIndex(prevIndex => prevIndex + nextItems.length);
      }
      
      if (currentIndex + initialPageSize >= items.length) {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 500);
  }, [currentIndex, hasMore, initialPageSize, items, loading]);

  // Reset when items change (e.g., when filters are applied)
  useEffect(() => {
    setVisibleItems([]);
    setCurrentIndex(0);
    setHasMore(true);
    
    if (items.length > 0) {
      setVisibleItems(items.slice(0, initialPageSize));
      setCurrentIndex(initialPageSize);
      setHasMore(initialPageSize < items.length);
    }
  }, [items, initialPageSize]);

  // Ref callback for the last element
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      
      if (observer.current) {
        observer.current.disconnect();
      }
      
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMoreItems();
          }
        },
        { rootMargin: `0px 0px ${threshold}px 0px` }
      );
      
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, loadMoreItems, threshold]
  );

  return { 
    visibleItems, 
    lastElementRef, 
    loading, 
    hasMore,
    reset: () => {
      setVisibleItems([]);
      setCurrentIndex(0);
      setHasMore(true);
    }
  };
}