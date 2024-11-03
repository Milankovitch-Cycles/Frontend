import React, { useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { register } from "../api/authService";
import { addAuthToken } from "../redux/states";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BaseInput from "../components/BaseInput";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataAuthentication = useSelector((state) => state.authToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataAuthentication?.email) {
      setEmail(dataAuthentication.email);
    }
  }, [dataAuthentication]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validaciones
    if (!email) {
      validationErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "El formato del correo electrónico es incorrecto";
    }

    if (!password) {
      validationErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      validationErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      validationErrors.password = "La contraseña debe contener al menos un número y un símbolo";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Debes repetir la contraseña";
    } else if (password !== confirmPassword) {
      validationErrors.passwordMatch = "Las contraseñas no coinciden";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const datos = { email, password };

      Swal.fire({
        title: "Generando su código de verificación",
        text: "Aguarde un momento...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const response = await register(datos);
      response.email = datos.email;
      dispatch(addAuthToken(response));

      Swal.close();
      sessionStorage.setItem("previousPage", window.location.pathname);
      navigate("/verifyCode");
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al registrar. Intenta nuevamente.",
      });
      setErrors({ apiError: "Error al registrar. Intenta nuevamente." });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleRegister} noValidate>
                <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
                <p className="text-gray-600 mb-4">Lorem ipsum</p>

                <div className="mb-4">
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
                </div>

                <div className="mb-4 relative">
                  <BaseInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={
                      errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                  <p className="text-gray-500 text-sm mt-1">
                    La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo.
                  </p>
                </div>

                <div className="mb-6 relative">
                  <BaseInput
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repetir contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={
                      <>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                        {errors.passwordMatch && (
                          <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
                        )}
                      </>
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>

                <div className="flex justify-center">
                  <button className="bg-blue-600 mb-4 text-white w-full px-4 py-2 rounded-md hover:bg-blue-500">
                    Crear cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
