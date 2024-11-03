import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetFinish } from "../api/authService";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dataAuthentication = useSelector((state) => state.authToken);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!newPassword)
      validationErrors.newPassword = "La nueva contraseña es obligatoria";
    if (newPassword.length < 4)
      validationErrors.newPassword =
        "La contraseña debe tener al menos 4 caracteres";
    if (!confirmPassword)
      validationErrors.confirmPassword =
        "La confirmación de la contraseña es obligatoria";
    if (newPassword !== confirmPassword)
      validationErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const datos = { password: newPassword };
      await resetFinish(datos, dataAuthentication.access_token);
      setErrors(null);

      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "Tu contraseña ha sido cambiada exitosamente.",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al cambiar la contraseña. Inténtalo nuevamente.",
      });
      console.error("Error al cambiar la contraseña:", error.message);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Cambiar Contraseña</h1>

                <BaseInput
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={
                    errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword}
                      </p>
                    )
                  }
                />

                <BaseInput
                  type="password"
                  placeholder="Repetir nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={
                    errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )
                  }
                />
                <p className="text-sm text-gray-300 mb-6">
                  La contraseña debe contener al menos 8 caracteres, una letra
                  mayúscula, una letra minúscula, un numero y un carácter
                  especial como !, *, etc
                </p>
                <BaseButton onPress={handleChangePassword}>
                  Confirmar
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
