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
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t, i18n } = useTranslation(); // Importar la función de traducción y i18n
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
      validationErrors.email = t('login.messageRegister');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = t('login.errorEmail');
    }

    if (!password) {
      validationErrors.password = t('login.errorPassword');
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
        text: t('dialogs.loginError'),
      });
      console.error("Error en el login:", error.message);
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <BackgroundSlider>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Cycle App</h1>
            <p className="text-2xl text-gray-600 mb-6 text-center">
              {t('login.logIn')}
            </p>

            {/* Botones para cambiar el idioma arriba del formulario */}
            <div className="flex justify-between mb-4">
              <button 
                type="button" 
                onClick={() => handleLanguageChange('es')} 
                className="text-blue-600">
                Español
              </button>
              <button 
                type="button" 
                onClick={() => handleLanguageChange('en')} 
                className="text-blue-600">
                English
              </button>
            </div>

            <BaseInput
              type="email"
              placeholder={t('login.email')}
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
                placeholder={t('login.password')}
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
              <BaseButton onPress={handleLogin}>{t('login.continue')}</BaseButton>
              <BaseLink
                path="/forgotPassword"
                text={t('login.forgotYourPassword')}
                className="mb-2 text-blue-500"
              />
            </div>
          </div>
          <div className="hidden lg:flex bg-blue-600 text-white py-10 px-8 rounded-r-lg items-center justify-center w-2/5">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Cycle App</h2>
              <p className="mb-6">
                {t('login.messageRegister')}
              </p>
              <BaseLink
                path="/register"
                text={t('login.signUpNow')}
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
