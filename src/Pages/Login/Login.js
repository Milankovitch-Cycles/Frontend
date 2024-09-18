import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components';
import Swal from 'sweetalert2';
import { login } from '../../api/authService'
import { useNavigate } from 'react-router-dom';
import { addAuthToken } from '../../redux/states';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email) validationErrors.email = 'El correo electrónico es obligatorio';
    if (!password) validationErrors.password = 'La contraseña es obligatoria';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

    }


    try {
      console.log('Iniciar sesión con:', { email, password });
      const datos = {
        email: email,
        password: password,
      };

      const response = await login(datos);
      dispatch(addAuthToken(response));
      navigate('/home');
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al iniciar sesión. Inténtalo nuevamente.',
      });
      console.error('Error en el login:', error.message);
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
                <form onSubmit={handleLogin}>
                  <h1 className="text-2xl font-bold mb-4">Login</h1>
                  <p className="text-gray-600 mb-4">Ingresa a tu cuenta</p>

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
                        placeholder="Contraseña"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="flex justify-between">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                      Login
                    </button>
                    <Link to="/forgotPassword">
                    <button className="text-indigo-500 hover:underline">Olvidaste tu contraseña?</button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden lg:flex bg-indigo-500 text-white py-10 px-8 rounded-r-lg items-center justify-center w-2/5">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Registro</h2>
                <p className="mb-6">
                  Si no estas registrado y quieres disfrutar de nuestra app, no dudes en registrarte.
                </p>
                <Link to="/register">
                  <button className="bg-white text-indigo-500 px-4 py-2 rounded-md">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
