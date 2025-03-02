import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import SparklingCursor from "./components/SparklingCursor";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch images with caching and request cancellation
  const fetchImages = async (query, page, cancelToken) => {
    if (!query) return;

    const cacheKey = `${query}-${page}`;
    const cachedData = localStorage.getItem(cacheKey);

    // Return cached data if available
    if (cachedData) {
      setImages((prev) => (page === 1 ? JSON.parse(cachedData) : [...prev, ...JSON.parse(cachedData)]));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        { cancelToken }
      );

      // Update images and cache the response
      setImages((prev) => (page === 1 ? response.data.results : [...prev, ...response.data.results]));
      setHasMore(response.data.results.length > 0);
      localStorage.setItem(cacheKey, JSON.stringify(response.data.results));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching images:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce the fetch function
  const debouncedFetch = useCallback(debounce(fetchImages, 500), []);

  // Fetch images when query or page changes
  useEffect(() => {
    const source = axios.CancelToken.source();
    debouncedFetch(query, page, source.token);

    return () => {
      source.cancel("Request canceled due to new request.");
    };
  }, [query, page, debouncedFetch]);

  
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  // Load more images when the user scrolls to the bottom
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      
      <SparklingCursor />

      
      <div className="min-h-screen bg-white bg-opacity-90 p-4">
        <div className="max-w-7xl mx-auto">
          
          <h1 className="text-4xl font-bold text-center mb-8 text-white transform perspective-1000 rotate-x-6 rotate-y-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              AI-Powered Image Search✨
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50"></span>
          </h1>

          {/* Search Bar */}
          <SearchBar query={query} handleSearch={handleSearch} />

          {/* Image Gallery */}
          <ImageGallery images={images} loading={loading} loadMore={loadMore} hasMore={hasMore} />
        </div>
      </div>
    </>
  );
};

export default App;