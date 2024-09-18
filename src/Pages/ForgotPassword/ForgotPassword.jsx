import React, { useState } from 'react';
import { Navbar } from '../../components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resetStart } from '../../api/authService'; 
import { addAuthToken } from '../../redux/states';
import { useDispatch } from 'react-redux';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    const validationErrors = {};


    if (!email) validationErrors.email = 'El correo electrónico es obligatorio';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      Swal.fire({
        title: 'Enviando solicitud de recuperación',
        text: 'Por favor, espere un momento...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const response = await resetStart({ email });
      response.email = email;
      dispatch(addAuthToken(response));

      Swal.close();

      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Revisa tu correo para obtener el código de recuperación.',
      });
      sessionStorage.setItem('previousPage', window.location.pathname);
      navigate('/verifyCode'); 

    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al recuperar la contraseña. Intenta nuevamente.',
      });

      console.error('Error en la solicitud de recuperación:', error.message);
      setErrors({ apiError: 'Error al recuperar la contraseña. Intenta nuevamente.' });
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
                <form onSubmit={handleRecoverPassword}>
                  <h1 className="text-2xl font-bold mb-4">Recuperar Contraseña</h1>
                  <p className="text-gray-600 mb-4">Ingresa tu correo para restablecer tu contraseña</p>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">@</span>
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {errors.apiError && <p className="text-red-500 text-sm mt-1">{errors.apiError}</p>}

                  <div className="flex justify-center">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                      Recuperar contraseña
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

export default RecoverPassword;
