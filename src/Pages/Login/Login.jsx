import React, { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { addAuthToken } from "../../redux/states";
import { useDispatch } from "react-redux";
import { BaseInput } from "../../components/BaseInput";
import { BaseButton } from "../../components/BaseButton";
import { BaseLink } from "../../components/BaseLink";

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
                <h1 className="text-3xl font-bold mb-4">My App</h1>
                <p className="text-2xl text-gray-600 mb-6">Iniciar sesión</p>
                <BaseInput
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <BaseInput
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <div className="flex flex-col items-center">
                  <BaseButton onPress={handleLogin}>Continuar</BaseButton>
                  <BaseLink
                    path="/forgotPassword"
                    text="Olvidaste tu contraseña?"
                    className="mb-2 text-blue-500"
                  ></BaseLink>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex bg-blue-600 text-white py-10 px-8 rounded-r-lg items-center justify-center w-2/5">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">MyApp</h2>
                <p className="mb-6 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut.
                </p>
                <BaseLink
                  path="/register"
                  text="Registrate ahora!"
                  className="mb-2 bg-white text-indigo-500 px-4 py-2 rounded-md"
                ></BaseLink>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
