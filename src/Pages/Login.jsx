import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { addAuthToken } from "../redux/states";
import { useDispatch } from "react-redux";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import BaseLink from "../components/BaseLink";

const images = [
  'https://media.istockphoto.com/id/1457436123/es/foto/plataforma-de-petr%C3%B3leo-y-gas-costa-afuera-en-el-sitio-de-producci%C3%B3n-aumentar-la-producci%C3%B3n-de.jpg?s=2048x2048&w=is&k=20&c=jGfTZDGA7_UjjVKTOlw1mXgTRfCIaX76rILv6N9EY2M=',
  'https://media.istockphoto.com/id/1447640636/es/foto/sitio-del-campo-petrolero-por-la-noche-las-bombas-de-petr%C3%B3leo-est%C3%A1n-funcionando-la-bomba-de.jpg?s=2048x2048&w=is&k=20&c=vypfiaGJHy5N5rbyqfSpX8CtTbGpyqRD_L_aDM2nwn8=',
  'https://media.istockphoto.com/id/1960084925/es/foto/men-inspection-engineers-working-with-laptop-of-oil-factory-and-gas-refinery-plant-industry-at.jpg?s=2048x2048&w=is&k=20&c=ojGffNuQbETO7HRTPa8g2g1pLpCq7rc2xUqaMkVpla0=',
];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!password) {
      validationErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const datos = { email, password };
      const response = await login(datos);
      dispatch(addAuthToken(response));
      navigate("/wells");
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${images[currentImageIndex]})`, transition: 'background-image 1s ease-in-out' }}>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">My App</h1>
            <p className="text-2xl text-gray-600 mb-6 text-center">Iniciar sesión</p>
            
            <BaseInput
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            />
            
            <div className="relative">
              <BaseInput
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                <i className={`fas fa-eye${showPassword ? "" : "-slash"}`}></i>
              </button>
            </div>

            <p className="text-gray-500 text-sm mt-1">
              La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.
            </p>

            <div className="flex flex-col items-center mt-4">
              <BaseButton onPress={handleLogin}>
                Continuar
              </BaseButton>
              <BaseLink
                path="/forgotPassword"
                text="Olvidaste tu contraseña?"
                className="mb-2 text-blue-500"
              />
            </div>
          </div>
          <div className="hidden lg:flex bg-blue-600 text-white py-10 px-8 rounded-r-lg items-center justify-center w-2/5">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">MyApp</h2>
              <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <BaseLink
                path="/register"
                text="Registrate ahora!"
                className="bg-white text-indigo-500 px-4 py-2 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;