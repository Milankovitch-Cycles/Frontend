import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ListWells from "../ListWells/ListWells"; 
import LoadWell from "../LoadWell/LoadWell";

const Home = () => {
  const [currentComponent, setCurrentComponent] = useState(<ListWells />); 

  const handleNavigation = (segment) => {
    console.log("Navegando a:", segment);
    switch (segment) {
      case "cargarPozos":
        console.log("hola mundo");
        setCurrentComponent(<LoadWell />);
        break;
      case "listarPozos":
        setCurrentComponent(<ListWells />);
        break;
      default:
        setCurrentComponent(<ListWells />);
        break;
    }
  };

  return (
    <Sidebar onNavigate={handleNavigation}>
      {currentComponent} 
    </Sidebar>
  );
};

export default Home;
