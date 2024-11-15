import React, { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { addAuthToken } from "../redux/states";
import { useDispatch } from "react-redux";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import BaseLink from "../components/BaseLink";
import BackgroundSlider from "../components/BackgroundSlider";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();


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
    <BackgroundSlider>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Cycle App</h1>
            <p className="text-2xl text-gray-600 mb-6 text-center">
              Iniciar sesión
            </p>

            <BaseInput
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={
                errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )
              }
            />

            <div className="relative">
              <BaseInput
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={
                  errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                <i className={`fas fa-eye${showPassword ? "" : "-slash"}`}></i>
              </button>
            </div>

            <div className="flex flex-col items-center mt-4">
              <BaseButton onPress={handleLogin}>Continuar</BaseButton>
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
              Inicia sesión para acceder a tu cuenta y disfrutar de nuestros servicios.
               ¿No tienes una cuenta?
              Regístrate aquí para empezar.
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
    </BackgroundSlider>
  );
};

export default Login;
