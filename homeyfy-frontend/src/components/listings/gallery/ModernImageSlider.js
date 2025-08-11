import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const ImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="no-images">
        <span>📷</span>
        <p>No images</p>
      </div>
    );
  }

  return (
    <div className="image-slider">
      <div className="slider-main">
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="main-image"
        />
        
        {images.length > 1 && (
          <>
            <button className="nav-btn prev-btn" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button className="nav-btn next-btn" onClick={nextSlide}>
              <FaChevronRight />
            </button>
            
            <div className="dots-container">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={(e) => goToSlide(e, index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ImageSlider;