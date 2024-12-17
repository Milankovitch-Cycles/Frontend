import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { registerFinish, resetStart, resetVerify } from "../api/authService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addAuthToken } from "../redux/states";
import { useDispatch } from "react-redux";
import BackgroundSlider from "../components/BackgroundSlider";
import { useTranslation } from 'react-i18next';

const Verify = () => {
  const [codeObtain, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [codeExpired, setCodeExpired] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const dataAuthentication = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const previousPage = sessionStorage.getItem("previousPage");
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Importar la función de traducción

  useEffect(() => {
    if (previousPage === "/register") {
      setTimer(60);
    } else if (
      previousPage === "/forgotPassword" ||
      previousPage === "/verifyCode"
    ) {
      setTimer(30);
    }
  }, [previousPage]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setCodeExpired(true);
    }
  }, [timer]);

  const resendCode = async () => {
    try {
      Swal.fire({
        title: t('dialogs.resendingCode'),
        text: t('dialogs.pleaseWaitResend'),
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const data = {
        email: dataAuthentication.email,
      };

      const response = await resetStart(data);
      response.email = dataAuthentication.email;
      dispatch(addAuthToken(response));

      Swal.close();

      Swal.fire({
        icon: "success",
        title: t('dialogs.requestSent'),
        text: t('dialogs.checkEmailForRecoveryCode'),
      }).then(() => {
        sessionStorage.setItem("previousPage", window.location.pathname);
        window.location.reload();
      });
    } catch (error) {
      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t('dialogs.passwordRecoveryError'),
      });

      console.error("Error en la solicitud de recuperación:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset validation error
    setValidationError(null);

    // Validate code length
    if (codeObtain.length !== 6) {
      setValidationError(t('verifyCode.codeLengthError'));
      return;
    }

    // Reset validation error
    setValidationError(null);

    // Validate code length
    if (codeObtain.length !== 6) {
      setValidationError(t('verifyCode.codeLengthError'));
      return;
    }

    try {
      if (
        previousPage === "/forgotPassword" ||
        previousPage === "/verifyCode"
      ) {
        const datos = { code: codeObtain };
        await resetVerify(datos, dataAuthentication.access_token);
        setApiError(null);

        Swal.fire({
          icon: "success",
          title: t('dialogs.codeVerified'),
          text: t('dialogs.codeVerificationSuccess'),
          confirmButtonText: t('dialogs.accept'),
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/changePassword");
          }
        });
      }

      if (previousPage === "/register") {
        const datos = { code: codeObtain };
        await registerFinish(datos, dataAuthentication.access_token);
        setApiError(null);

        Swal.fire({
          icon: "success",
          title: t('dialogs.userCreated'),
          text: t('dialogs.accountCreated'),
          confirmButtonText: t('dialogs.accept'),
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error.message);
      setApiError(t('dialogs.codeVerificationError'));
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
                {t('verifyCode.verifyCode')}
                </h1>
                <p className="text-gray-600 mb-4">
                     {t('verifyCode.sentCode')}
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      maxLength="6"
                      placeholder={t('verifyCode.enterCode')}
                      value={codeObtain}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    {validationError && <p className="text-red-500 text-sm">{validationError}</p>} {/* Warning for invalid code */}
                  </div>

                  {apiError && (
                    <div className="mb-4">
                      <p className="text-red-500">{apiError}</p>
                    </div>
                  )}

                  <div className="mb-4 text-gray-600">
                    <p>
                    {t('verifyCode.codeExpiresIn')}:{" "}
                      <span className="font-bold">{timer}  {t('verifyCode.seconds')}</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-400"
                    disabled={timer === 0}
                  >
                        {t('verifyCode.verifyCodeAction')}
                  </button>

                  {codeExpired && (
                    <div className="mt-4">
                      {previousPage === "/forgotPassword" ||
                      previousPage === "/verifyCode" ? (
                        <button
                          onClick={resendCode}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          {t('verifyCode.resendCode')}
                        </button>
                      ) : (
                        previousPage === "/register" && (
                          <button
                            onClick={() => navigate("/register")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                             {t('verifyCode.backToRegistration')}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </BackgroundSlider>
    </>
  );
};

export default Verify;
