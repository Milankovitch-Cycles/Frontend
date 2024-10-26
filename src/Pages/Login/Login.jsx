import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { addAuthToken } from "../../redux/states";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email) validationErrors.email = "El correo electrónico es obligatorio";
    if (!password) validationErrors.password = "La contraseña es obligatoria";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }

    try {
      const datos = {
        email: email,
        password: password,
      };

      const response = await login(datos);
      dispatch(addAuthToken(response));
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al iniciar sesión. Inténtalo nuevamente.",
      });
      console.error("Error en el login:", error.message);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleLogin}>
                  <h1 className="text-3xl font-bold mb-4">My App</h1>
                  <p className="text-2xl text-gray-600 mb-6">Iniciar sesión</p>

                  <div className="mb-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-r-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <button className="bg-blue-600 mb-4 text-white w-full px-4 py-2 rounded-md hover:bg-blue-500">
                      Continuar
                    </button>
                    <Link to="/forgotPassword">
                      <button className="text-indigo-500 text-sm text-hover:underline mb-2">
                        Olvidaste tu contraseña?
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <Register></Register>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

const Register = () => {
  return (
    <div className="hidden lg:flex bg-blue-600 text-white py-10 px-8 rounded-r-lg items-center justify-center w-2/5">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">MyApp</h2>
        <p className="mb-6 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </p>
        <Link to="/register">
          <button className="bg-white text-indigo-500 px-4 py-2 rounded-md">
            Registrate ahora!
          </button>
        </Link>
      </div>
    </div>
  );
};
