import React, { useState } from 'react'
import { register } from '../../api/authService'
import { Navbar } from '../../components';
import { addAuthToken } from '../../redux/states';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validación del formulario
    if (!username) validationErrors.username = 'El nombre de usuario es obligatorio';
    if (!email) validationErrors.email = 'El correo electrónico es obligatorio';
    if (!password) validationErrors.password = 'La contraseña es obligatoria';
    if (!confirmPassword) validationErrors.confirmPassword = 'Debes repetir la contraseña';
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.passwordMatch = 'Las contraseñas no coinciden';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const datos = {
        email: email,
        password: password,
      };


      Swal.fire({
        title: 'Generando su código de verificación',
        text: 'Aguarde un momento...',
        didOpen: () => {
          Swal.showLoading(); 
        },
        allowOutsideClick: false, 
        showConfirmButton: false, 
      });

 
      const response = await register(datos);
      response.email = datos.email;
      dispatch(addAuthToken(response));

   
      Swal.close();
      sessionStorage.setItem('previousPage', window.location.pathname);
      navigate('/verifyCode');

    } catch (error) {
     
      Swal.close();

    
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrar. Intenta nuevamente.',
      });
      console.error('Error en la solicitud de registro:', error.message);
      setErrors({ apiError: 'Error al registrar. Intenta nuevamente.' });
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
                <form onSubmit={handleRegister}>
                  <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
                  <p className="text-gray-600 mb-4">Crea tu cuenta</p>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0zm-4 0v6m0 0H8m4 0h4" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Nombre de usuario"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">@</span>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c-2.414 0-4 1.795-4 4v1h8v-1c0-2.205-1.586-4-4-4zm0 0V9m0-2a2 2 0 1 1 4 0v2m-4 0a2 2 0 1 1-4 0V9" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-100 rounded-l-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c-2.414 0-4 1.795-4 4v1h8v-1c0-2.205-1.586-4-4-4zm0 0V9m0-2a2 2 0 1 1 4 0v2m-4 0a2 2 0 1 1-4 0V9" />
                        </svg>
                      </span>
                      <input
                        type="password"
                        placeholder="Repetir contraseña"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    {errors.passwordMatch && <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>}
                  </div>

                  <div className="flex justify-center">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                      Crear cuenta
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

export default Register;