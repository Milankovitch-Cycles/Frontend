import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetStart } from "../api/authService";
import { addAuthToken } from "../redux/states";
import BaseInput from "../components/BaseInput";
import BaseButton  from "../components/BaseButton";
import { useDispatch } from "react-redux";
import BackgroundSlider from "../components/BackgroundSlider";
import { useTranslation } from 'react-i18next';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Importar la función de traducción
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = t('login.errorEmail');
    } else if (!validateEmail(email)) {
      validationErrors.email = t('recoverPassword.invalidEmail');
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      Swal.fire({
        title: t('dialogs.sendingRecoveryRequest'),
        text: t('dialogs.pleaseWait'),
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
        title: t('dialogs.requestSent'),
        text: t('dialogs.checkEmailForRecoveryCode'),
      });
      sessionStorage.setItem("previousPage", window.location.pathname);
      navigate("/verifyCode");
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t('dialogs.passwordRecoveryError'),
      });

      console.error("Error en la solicitud de recuperación:", error.message);
      setErrors({
        apiError: t('dialogs.passwordRecoveryError'),
      });
    }
  };

  return (
    <>
      <BackgroundSlider>

        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">
                {t('recoverPassword.recoverPassword')},
                </h1>
                <p className="text-gray-600 mb-4">
                  {t('recoverPassword.enterYourEmail')},
                </p>
                <BaseInput
                  type="email"
                  placeholder={t('recoverPassword.email')}
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
                {t('recoverPassword.recoverPassword')}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BackgroundSlider>
    </>
  );
};

export default RecoverPassword;
