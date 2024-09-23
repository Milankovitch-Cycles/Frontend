import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components';
import { Link } from 'react-router-dom';
import Carousel from './components/Caurrousel';

const LandingPage = () => {
  const [remainingHeight, setRemainingHeight] = useState('auto');


  const calculateHeight = () => {
    const navbarHeight = document.querySelector('nav').offsetHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;
    const screenHeight = window.innerHeight;
    const availableHeight = screenHeight - navbarHeight - footerHeight;
    setRemainingHeight(`${availableHeight}px`);
  };

  useEffect(() => {
 
    calculateHeight();

  
    window.addEventListener('resize', calculateHeight);

 
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex items-center justify-center"
        style={{ height: remainingHeight }}
      >
        <Carousel />
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Nuestra App. Todos los derechos reservados.</p>
          <Link to="/privacy-policy" className="text-gray-400 hover:underline">
            Política de Privacidad
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
