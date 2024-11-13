import React, { useState, useEffect } from "react";

const images = [
  "/img/atardecer.jpg",
  "/img/extractor.jpg",
  "/img/mar.jpg",
];

const BackgroundSlider = ({ children }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentImage})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundSlider;
