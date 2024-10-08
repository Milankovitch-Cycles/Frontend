import React from 'react';
import { Navbar } from '../../components';

const DashboardCard = ({ title, icon, onClick }) => (
  <div
    className="bg-gradient-to-r from-slate-600 to-zinc-500 shadow-lg rounded-xl p-6 flex items-center space-x-4 text-white cursor-pointer hover:bg-gradient-to-r hover:from-slate-700 hover:to-zinc-600 transition duration-300"
    onClick={onClick}
  >
    <div className="text-gray-300">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  </div>
);

const Home = () => {
  const handleUploadClick = () => {
    console.log('Subir Archivo del pozo');
  };

  const handleProcessingViewClick = () => {
    console.log('Ver procesamiento');
  };

  const handleProcessingListClick = () => {
    console.log('Listado de procesamiento');
  };

  const handleMessagesClick = () => {
    console.log('Mensajes');
  };

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen p-10">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard
              title="Subir Archivo del pozo"
              icon={
                <span className="material-symbols-outlined text-blue-500 text-7xl">
                  upload
                </span>
              }
              onClick={handleUploadClick}
            />
            <DashboardCard
              title="Ver procesamiento"
              icon={
                <span className="material-symbols-outlined text-green-500 text-7xl">
                  visibility
                </span>
              }
              onClick={handleProcessingViewClick}
            />
            <DashboardCard
              title="Listado de procesamiento"
              icon={
                <span className="material-symbols-outlined text-yellow-500 text-7xl">
                  list
                </span>
              }
              onClick={handleProcessingListClick}
            />
            <DashboardCard
              title="Mensajes"
              icon={
                <span className="material-symbols-outlined text-red-500 text-7xl">
                  message
                </span>
              }
              onClick={handleMessagesClick}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Archivo</h2>
              <div className="bg-gray-100 rounded-lg h-64"></div>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Procesamiento</h2>
              <div className="bg-gray-100 rounded-lg h-64"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
