import React, { useState, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa'; 

const Carousel = () => {
  const images = [
    'https://media.istockphoto.com/id/1457436123/es/foto/plataforma-de-petr%C3%B3leo-y-gas-costa-afuera-en-el-sitio-de-producci%C3%B3n-aumentar-la-producci%C3%B3n-de.jpg?s=2048x2048&w=is&k=20&c=jGfTZDGA7_UjjVKTOlw1mXgTRfCIaX76rILv6N9EY2M=',
    'https://media.istockphoto.com/id/1447640636/es/foto/sitio-del-campo-petrolero-por-la-noche-las-bombas-de-petr%C3%B3leo-est%C3%A1n-funcionando-la-bomba-de.jpg?s=2048x2048&w=is&k=20&c=vypfiaGJHy5N5rbyqfSpX8CtTbGpyqRD_L_aDM2nwn8=',
    'https://media.istockphoto.com/id/1960084925/es/foto/men-inspection-engineers-working-with-laptop-of-oil-factory-and-gas-refinery-plant-industry-at.jpg?s=2048x2048&w=is&k=20&c=ojGffNuQbETO7HRTPa8g2g1pLpCq7rc2xUqaMkVpla0=',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval); 
    }
  }, [isPaused, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const togglePause = () => {
    setIsPaused(!isPaused); 
  };

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden w-full h-full relative">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-gray-700"
      >
        &#10095;
      </button>
      <button
        onClick={togglePause}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent text-white p-4 rounded-full hover:bg-gray-700"
      >
        {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
      </button>
    </div>
  );
};

export default Carousel;
