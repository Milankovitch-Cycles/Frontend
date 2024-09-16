import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components';

const Verify = () => {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(30);
  const [codeExpired, setCodeExpired] = useState(false);

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

  const resendCode = () => {
    setCodeExpired(false);
    setTimer(30);
    console.log('Código reenviado.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Código ingresado: ${code}`);
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
                <p className="text-gray-600 mb-4">Te hemos enviado un código de 5 dígitos a tu correo electrónico.</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="Ingresa el código"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

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
                      <p className="text-red-500 mb-2">El código ha expirado. Solicita uno nuevo.</p>
                      <button
                        onClick={resendCode}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Reenviar Código
                      </button>
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
