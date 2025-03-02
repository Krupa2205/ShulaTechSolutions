import { useEffect, useRef } from "react";
import ImageCard from "./ImageCard";

const ImageGallery = ({ images, loading, loadMore, hasMore }) => {
  const observerRef = useRef();

  
  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore, loadMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image, index) => (
        <ImageCard key={image.id + index} image={image} />
      ))}

      {/* Loading Spinner */}
      {loading && (
        <div className="col-span-full flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Observer Target for Infinite Scrolling */}
      {hasMore && <div ref={observerRef} className="col-span-full h-10"></div>}
    </div>
  );
};

export default ImageGallery;