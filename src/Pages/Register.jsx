import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../api/authService";
import { addAuthToken } from "../redux/states";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BaseInput from "../components/BaseInput";
import BackgroundSlider from "../components/BackgroundSlider";
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataAuthentication = useSelector((state) => state.authToken);
  const { t, i18n } = useTranslation(); // Importar la función de traducción y i18n
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    if (!firstName) {
      validationErrors.firstName = t('register.firstNameRequired');
    }

    if (!lastName) {
      validationErrors.lastName = t('register.lastNameRequired');
    }

    if (!email) {
      validationErrors.email = t('register.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = t('register.emailFormatError');
    }

    if (!password) {
      validationErrors.password = t('register.passwordRequired');
    } else if (password.length < 8) {
      validationErrors.password = t('register.passwordMinLength');
    } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      validationErrors.password = t('register.passwordFormatError');
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = t('register.repeatPasswordRequired');
    } else if (password !== confirmPassword) {
      validationErrors.passwordMatch = t('register.passwordsDoNotMatch');
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const datos = { email, password, first_name: firstName, last_name: lastName };

      Swal.fire({
        title: t('dialogs.generatingVerificationCode'),
        text: t('dialogs.pleaseWait'),
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
        text: t('dialogs.registrationError'),
      });
      setErrors({ apiError: t('dialogs.registrationError')});
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <BackgroundSlider>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              
             

              <form onSubmit={handleRegister} noValidate>
                <h1 className="text-2xl font-bold mb-4">{t('register.register')}</h1>

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

                <div className="mb-4">
                  <BaseInput
                    type="text"
                    placeholder={t('register.firstName')}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={
                      errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )
                    }
                  />
                </div>

                <div className="mb-4">
                  <BaseInput
                    type="text"
                    placeholder={t('register.lastName')}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={
                      errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )
                    }
                  />
                </div>

                <div className="mb-4">
                  <BaseInput
                    type="email"
                    placeholder={t('register.email')}
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
                    placeholder={t('register.password')}
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
                </div>

                <div className="mb-6 relative">
                  <BaseInput
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t('register.repeatPassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={
                      <>{errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}</>
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
                    {t('register.createAccount')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BackgroundSlider>
  );
};

export default Register;
