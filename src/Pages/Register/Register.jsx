import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../api/authService";
import { addAuthToken } from "../../redux/states";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BaseInput } from "../../components/BaseInput";
import { BaseButton } from "../../components/BaseButton";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataAuthentication = useSelector((state) => state.authToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataAuthentication?.email) {
      setEmail(dataAuthentication.email);
    }
  }, [dataAuthentication]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) validationErrors.email = "El correo electrónico es obligatorio";
    if (!password) validationErrors.password = "La contraseña es obligatoria";
    if (!confirmPassword)
      validationErrors.confirmPassword = "Debes repetir la contraseña";
    if (password !== confirmPassword)
      validationErrors.passwordMatch = "Las contraseñas no coinciden";

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
    <>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
                <p className="text-gray-600 mb-4">Lorem ipsum</p>
                <BaseInput
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={
                    errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )
                  }
                />
                <BaseInput
                  type="password"
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
                <BaseInput
                  type="password"
                  placeholder="Repetir contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={
                    <>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                      {errors.passwordMatch && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.passwordMatch}
                        </p>
                      )}
                    </>
                  }
                />
                <BaseButton onPress={handleRegister}>Crear cuenta</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
