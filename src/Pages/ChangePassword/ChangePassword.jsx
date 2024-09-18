import React, { useState } from 'react';
import { Navbar } from '../../components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {resetFinish} from '../../api/authService'

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dataAuthentication = useSelector((state) => state.authToken);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!newPassword) validationErrors.newPassword = 'La nueva contraseña es obligatoria';
    if (newPassword.length < 4) validationErrors.newPassword = 'La contraseña debe tener al menos 4 caracteres';
    if (!confirmPassword) validationErrors.confirmPassword = 'La confirmación de la contraseña es obligatoria';
    if (newPassword !== confirmPassword) validationErrors.confirmPassword = 'Las contraseñas no coinciden';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
        const datos = { "password": newPassword };
        await resetFinish(datos, dataAuthentication.access_token);
        setErrors(null);


      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Tu contraseña ha sido cambiada exitosamente.',
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al cambiar la contraseña. Inténtalo nuevamente.',
      });
      console.error('Error al cambiar la contraseña:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-700 to-black min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleChangePassword}>
                  <h1 className="text-2xl font-bold mb-4">Cambiar Contraseña</h1>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11c-2.414 0-4 1.795-4 4v1h8v-1c0-2.205-1.586-4-4-4zm0 0V9m0-2a2 2 0 1 1 4 0v2m-4 0a2 2 0 1 1-4 0V9"
                          />
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Nueva Contraseña"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11c-2.414 0-4 1.795-4 4v1h8v-1c0-2.205-1.586-4-4-4zm0 0V9m0-2a2 2 0 1 1 4 0v2m-4 0a2 2 0 1 1-4 0V9"
                          />
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Confirmar Nueva Contraseña"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                      Cambiar Contraseña
                    </button>
                    <button className="text-indigo-500 hover:underline" onClick={() => navigate('/login')}>
                      Volver al login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
