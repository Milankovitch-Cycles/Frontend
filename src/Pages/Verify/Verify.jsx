import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components';
import { useSelector } from 'react-redux';
import { registerFinish } from '../../api/authService';
import { resetStart } from '../../api/authService';
import { resetVerify } from '../../api/authService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addAuthToken } from '../../redux/states';
import { useDispatch } from 'react-redux';

const Verify = () => {
  const [codeObtain, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [codeExpired, setCodeExpired] = useState(false);
  const [apiError, setApiError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const previousPage = sessionStorage.getItem('previousPage');
  const dispatch = useDispatch();

  useEffect(() => {

    if (previousPage === '/register') {
      setTimer(60); 
    } else if (previousPage === '/forgotPassword' || previousPage === '/verifyCode') {
      setTimer(30); 
    }
  }, [previousPage]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setCodeExpired(true);
    }
  }, [timer]);

  const resendCode = async () => {
    try {
      Swal.fire({
        title: 'Enviando código nuevamente',
        text: 'Por favor, espere un momento...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const data = {
        email: dataAuthentication.email,
      };

      const response = await resetStart(data);
      response.email = dataAuthentication.email;
      dispatch(addAuthToken(response));

      Swal.close();

      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Revisa tu correo para obtener el código de recuperación.',
      }).then(() => {
        sessionStorage.setItem('previousPage', window.location.pathname);
        window.location.reload();
      });

    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al recuperar la contraseña. Intenta nuevamente.',
      });

      console.error('Error en la solicitud de recuperación:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (previousPage === '/forgotPassword' || previousPage === '/verifyCode') {
        const datos = { code: codeObtain };
        await resetVerify(datos, dataAuthentication.access_token);
        setApiError(null);

        Swal.fire({
          icon: 'success',
          title: 'Código verificado',
          text: 'Tu código ha sido verificado correctamente.',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/changePassword');
          }
        });
      }

      if (previousPage === '/register') {
        const datos = { code: codeObtain };
        await registerFinish(datos, dataAuthentication.access_token);
        setApiError(null);

        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          text: 'Tu cuenta ha sido creada con éxito.',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      }

    } catch (error) {
      console.error('Error en la solicitud de registro:', error.message);
      setApiError('Error al verificar el código. Intenta nuevamente.');
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
                <h1 className="text-2xl font-bold mb-4">Verificación de Código</h1>
                <p className="text-gray-600 mb-4">Te hemos enviado un código de 6 dígitos a tu correo electrónico.</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      maxLength="6"
                      placeholder="Ingresa el código"
                      value={codeObtain}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {apiError && (
                    <div className="mb-4">
                      <p className="text-red-500">{apiError}</p>
                    </div>
                  )}

                  <div className="mb-4 text-gray-600">
                    <p>El código expira en: <span className="font-bold">{timer} segundos</span></p>
                  </div>

                  <button
                    type="submit"
                    className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600"
                    disabled={timer === 0}
                  >
                    Verificar Código
                  </button>

                  {codeExpired && (
                    <div className="mt-4">
                      {previousPage === '/forgotPassword' || previousPage === '/verifyCode' ? (
                        <button
                          onClick={resendCode}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Reenviar Código
                        </button>
                      ) : previousPage === '/register' && (
                        <button
                          onClick={() => navigate('/register')}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Volver a Registro
                        </button>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
