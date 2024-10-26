import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetStart } from "../../api/authService";
import { addAuthToken } from "../../redux/states";
import { BaseInput } from "../../components/BaseInput";
import { BaseButton } from "../../components/BaseButton";
import { useDispatch } from "react-redux";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) validationErrors.email = "El correo electrónico es obligatorio";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      Swal.fire({
        title: "Enviando solicitud de recuperación",
        text: "Por favor, espere un momento...",
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const response = await resetStart({ email });
      response.email = email;
      dispatch(addAuthToken(response));

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: "Revisa tu correo para obtener el código de recuperación.",
      });
      sessionStorage.setItem("previousPage", window.location.pathname);
      navigate("/verifyCode");
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al recuperar la contraseña. Intenta nuevamente.",
      });

      console.error("Error en la solicitud de recuperación:", error.message);
      setErrors({
        apiError: "Error al recuperar la contraseña. Intenta nuevamente.",
      });
    }
  };

  return (
    <>
      <div className="bg-white to-black min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">
                  Recuperar contraseña
                </h1>
                <p className="text-gray-600 mb-4">
                  Ingresa tu correo para restablecer tu contraseña
                </p>
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
                <BaseButton onPress={handleRecoverPassword}>
                  Recuperar contraseña
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoverPassword;
