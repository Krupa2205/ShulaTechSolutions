const ImageCard = ({ image }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
      

      {/* Card Content */}
      <div className="relative rounded-lg bg-black bg-opacity-90">
        <img
          src={image.urls.small}
          alt={image.alt_description}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <p className="text-sm text-white">{image.description || "No description"}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;