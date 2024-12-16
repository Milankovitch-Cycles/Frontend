import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                day: "Day",
                wellProcessing: "Well Processing",
                createJob: "Create Job",
                addWell: "Add Well",
                type: {
                    "NEW_WELL": "New Well",
                    "MILANKOVIC_CYCLES": "Milankovic Cycles",
                    "PREDICTION": "Prediction",
                    "GRAPHS": "Graphs",
                },
                status: {
                    "processed": "Processed",
                    "pending": "Pending",
                    "failed": "Failed",
                    "completed": "Completed",
                    "in_progress": "In Progress",
                },
                parameters: {
                    "filename": "File Name",
                    "min_window": "Min Window",
                    "max_window": "Max Window",
                    "tolerance": "Tolerance",
                    "sedimentation_rate": "Sedimentation Rate",
                    "eccentricity": "Eccentricity",
                    "obliquity": "Obliquity",
                    "precession": "Precession",
                    "frequenciesGraph": "Frequencies Graph",
                },
                reason: {
                    "frequencyNotWithinToleranceRange": "Frequency not within tolerance range",
                    "Frequency not within tolerance range": "Frequency not within tolerance range",
                },
                columns: {
                    "id": "ID",
                    "user_id": "User ID",
                    "type": "Type",
                    "parameters": "Parameters",
                    "status": "Status",
                    "created_at": "Created At",
                    "name": "Name",
                    "description": "Description",
                    "actions" : "Actions"
                },
                jobsList: {
                    "title": "Jobs List",
                    "filter": "Filter: ",
                },
                listWells: {
                    "title": "Wells",
                    "filter": "Filter: ",
                },
                pagination: {
                    "rowsPerPage": "Rows per page",
                },
                dialogs: {
                    addNewWell: {
                        title: "Add New Well",
                    },

                    deleteWell: {
                        title: "Are you sure you want to delete this well?",
                        text: "This action cannot be undone!",
                        cancel: "Cancel",
                        confirm: "Delete"
                    },
                 

                    loadWell: { // Agregado
                        validationMessage: "Please fill all required fields.",
                        successTitle: "Well Added",
                        successButton: "OK",
                        successMessage: "Well added successfully.",
                        errorMessage: "Error adding well",
                        unknownError: "Unknown error occurred",
                        error: "Error",
                        wellNameLabel: "Well Name",
                        wellNameError: "Well name is required.",
                        descriptionLabel: "Description",
                        attachFileLabel: "Attach LAS file",
                        fileError: "A file is required.",
                        addButton: "Add Well",
                    },
                    "generatingVerificationCode": "Generating your verification code",
                        "pleaseWait": "Please wait a moment...",
                        "sendingRecoveryRequest": "Sending recovery request",
                        "pleaseWaitAgain": "Please wait a moment...",
                        "requestSent": "Request sent",
                        "checkEmailForRecoveryCode": "Check your email for the recovery code",
                        "resendingCode": "Resending code",
                        "pleaseWaitResend": "Please wait a moment...",
                        "error": "Error",
                        "loginError": "There was a problem logging in. Please try again.",
                        "registrationError": "Error registering. Please try again.",
                        "passwordRecoveryError": "Error recovering the password. Please try again.",
                        "codeLengthError": "The code must be exactly 6 digits long.",
                        "codeVerified": "Code verified",
                        "codeVerificationSuccess": "Your code has been successfully verified.",
                        "accept": "Accept",
                        "userCreated": "User created successfully",
                        "accountCreated": "Your account has been successfully created.",
                        "codeVerificationError": "Error verifying the code. Please try again.",
                       

                },
                home: {
                    "recentActivity": "Recent Activity",
                    "statusesOfTheProcedures": "Statuses of the procedures",
                    "dailyProcessing": "Processing by Days (Last 7 Days)",
                    "numberOfWells": "Number of Wells",
                    "numberOfProcessings": "Number of Processings",

                },
                createJobs: {
                    "createJob": "Create Job",
                    "TypeOfProcessings": "Type of Processings",
                    "selectAnalysisWindow": "Select Analysis Window",
                    "start": "Start",
                    "end": "End",
                    "tolerance": "Tolerancia (%)",
                    "sedimentationRate": "Sedimentation Rate",
                    "graphsJob": "Graphs Job ",
                    "instructionGraphs": "This job will create the following graphs",
                    "instructionPrediction": "This job will determine the probability of finding oil and gas based on gamma ray concentration.",
                    "predictionJob": "Prediction Job",
                    "graphsJobs": "Graphs Job",

                },
                "graphs": {
                    "depthVsGammaRayChart": "Depth versus Gamma Ray chart",
                    "gammaRayHistogram": "Gamma Ray Histogram",
                    "scatterPlotGammaRay": "Scatter Plot of Gamma Ray",
                    "depthVsBulkDensityChart": "Depth versus Bulk Density chart",
                    "bulkDensityHistogram": "Bulk Density Histogram",
                    "scatterPlotBulkDensity": "Scatter Plot of Bulk Density",
                    "depthVsNeutronPorosityChart": "Depth versus Neutron Porosity chart",
                    "neutronPorosityHistogram": "Neutron Porosity Histogram",
                    "scatterPlotNeutronPorosity": "Scatter Plot of Neutron Porosity",
                    "missingValues": "Missing Values",
                    "heatmapVariableCorrelations": "Heatmap of Variable Correlations",
                    "multipleCurvePlot": "Multiple Curve Plot",
                    "pairplotVariables": "Pairplot of Variables",
                    "Depth versus Gamma Ray chart": "Depth versus Gamma Ray chart",
                    "Gamma Ray Histogram": "Gamma Ray Histogram",
                    "Scatter Plot of Gamma Ray": "Scatter Plot of Gamma Ray",
                    "Depth versus Bulk Density chart": "Depth versus Bulk Density chart",
                    "Bulk Density Histogram": "Bulk Density Histogram",
                    "Scatter Plot of Bulk Density": "Scatter Plot of Bulk Density",
                    "Depth versus Neutron Porosity chart": "Depth versus Neutron Porosity chart",
                    "Neutron Porosity Histogram": "Neutron Porosity Histogram",
                    "Scatter Plot of Neutron Porosity": "Scatter Plot of Neutron Porosity",
                    "Missing Values": "Missing Values",
                    "Heatmap of Variable Correlations": "Heatmap of Variable Correlations",
                    "Multiple Curve Plot": "Multiple Curve Plot",
                    "Pairplot of Variables": "Pairplot of Variables"
                },

                jobsDetails: {
                    "jobDetail": "Process Details",
                    "jobInformation": "Process Information",
                    "resultGraphs": "Graph Results",
                    "reason": "Reason",
                    "graphsDetails":"Graph Details",
                    "eccentricity": "Eccentricity",
                    "obliquity": "Obliquity",
                    "precession": "Precession",
                    "predictionsGraph": "Predictions Graph",
                    "orderByDepth": "Order By Depth",
                    "orderByOilProbability": "Order by Oil Probability"

                },
                wellDetails: {
                    "description": "Descripción",
                    "fileLas": "LAS file",
                    "depthRange": "Depth Range",
                    "frequencyRange": "Frequency Range",
                    "massDensityRange": "Mass Density Range",
                    "gammaRayRange": "Gamma Ray Range",
                    "neutronPorosityRange": "Neutron Porosity Range",
                    "processingGraphs": "Processing Graphs",
                    "graphsDetails":"Graph Details",
                    "apiNumber": "Well ID",
                    "company": "Company",
                    "country": "Location",
                    "county": "Country Code",
                    "field": "Field",
                    "nation": "Nationality",
                    "nullValue": "No Data Value",
                    "provinceBasin": "Platform Well",
                    "provinceBasinSub": "Well Section",
                    "province": "Province",
                    "state": "Country",
                    "step": "Step",
                    "stop": "Stop Depth",
                    "strt": "Start Depth",
                    "wellboreName": "Wellbore Name",
                    "wellName": "Well Name"

                   


                },
                layout: {
                    "home": "Home",
                    "wells": "Wells",
                    "processing": "Processing",
                    "account": "Account",
                    "logout": "Logout"
                },
                login: {
                    "logIn": "Log in",
                    "email": "Email",
                    "password": "Password",
                    "continue": "Continue",
                    "forgotYourPassword": "Forgot your password?",
                    "messageRegister": "Log in to access your account and enjoy our services. Don't have an account? Sign up here to get started.",
                    "signUpNow": "Sign up now",
                     "errorEmail": "The email is required.",
                     "errorPassword": "The password is required."
                },
                recoverPassword: {
                    "recoverPassword": "Recover password",
                    "enterYourEmail": "Enter your email to reset your password",
                    "email": "Email",
                    "invalidEmail": "The email is not valid"
                    

                },
                verifyCode: {
                    "verifyCode": "Code Verification",
                    "sentCode": "We have sent a 6-digit code to your email",
                    "enterCode": "Enter code",
                    "codeExpiresIn": "The code expires in",
                    "verifyCodeAction": "Verify code",
                    "resendCode": "Resend code",
                    "seconds": "seconds",
                    "backToRegistration": "Back to Registration"
                },

                register: {
                    "register": "Sign Up",
                    "firstName": "First Name",
                    "lastName": "Last Name",
                    "email": "Email",
                    "password": "Password",
                    "firstNameRequired": "First name is required",
                    "lastNameRequired": "Last name is required",
                    "emailRequired": "Email is required",
                    "passwordRequired": "Password is required",
                    "passwordMinLength": "Password must be at least 8 characters, include a number and a symbol",
                    "repeatPassword": "Repeat password",
                    "repeatPasswordRequired": "You must repeat the password",
                    "createAccount": "Create Account",
                    "emailFormatError": "The email format is incorrect",
                    "passwordFormatError": "The password must contain at least one number and one symbol",
                    "passwordsDoNotMatch": "The passwords do not match"
                },

              

            },
        },
        es: {
            translation: {
                day: "Día",
                wellProcessing: "Procesamiento de Pozo",
                createJob: "Crear Proceso",
                addWell: "Agregar Pozo",
                type: {
                    "NEW_WELL": "Nuevo Pozo",
                    "MILANKOVIC_CYCLES": "Ciclos de Milankovitch",
                    "PREDICTION": "Predicción",
                    "GRAPHS": "Gráficos",
                },
                status: {
                    "processed": "Procesado",
                    "pending": "Pendiente",
                    "failed": "Fallido",
                    "completed": "Completado",
                    "in_progress": "En Progreso",
                },
                parameters: {
                    "filename": "Nombre de Archivo",
                    "min_window": "Ventana Mínima",
                    "max_window": "Ventana Máxima",
                    "tolerance": "Tolerancia",
                    "sedimentation_rate": "Tasa de Sedimentación",
                    "eccentricity": "Excentricidad",
                    "obliquity": "Oblicuidad",
                    "precession": "Precesión",
                    "frequenciesGraph": "Gráfico de Frecuencias",
                },
                reason: {
                    "frequencyNotWithinToleranceRange": "Frecuencia fuera del rango de tolerancia",
                    "Frequency not within tolerance range": "Frecuencia fuera del rango de tolerancia",
                },
                columns: {
                    "id": "ID",
                    "user_id": "ID de Usuario",
                    "type": "Tipo",
                    "parameters": "Parámetros",
                    "status": "Estado",
                    "created_at": "Fecha de Creación",
                    "name": "Nombre",
                    "description": "Descripción",
                     "actions" : "Acciones"
                },
                jobsList: {
                    "title": "Procesos",
                    "filter": "Filtrar: ",
                },
                listWells: {
                    "title": "Pozos",
                    "filter": "Filtrar: ",
                },
                pagination: {
                    "rowsPerPage": "Filas por página",
                },
                dialogs: {
                    addNewWell: {
                        title: "Agregar Nuevo Pozo",
                    },

                    deleteWell: {
                        title: "¿Estás seguro de querer eliminar este pozo?",
                        text: "¡Esta acción no se puede deshacer!",
                        cancel: "Cancelar",
                        confirm: "Eliminar"

                    },
                    loadWell: { // Agregado
                        validationMessage: "Por favor complete todos los campos requeridos.",
                        successTitle: "Pozo Agregado",
                        successButton: "Aceptar",
                        successMessage: "Pozo agregado exitosamente.",
                        errorMessage: "Error al agregar pozo",
                        unknownError: "Ocurrió un error desconocido",
                        error: "Error",
                        wellNameLabel: "Nombre del Pozo",
                        wellNameError: "El nombre del pozo es obligatorio.",
                        descriptionLabel: "Descripción",
                        attachFileLabel: "Adjuntar archivo LAS",
                        fileError: "Es necesario un archivo.",
                        addButton: "Agregar Pozo",
                    },

                    "generatingVerificationCode": "Generando su código de verificación",
                    "pleaseWait": "Aguarde un momento...",
                    "sendingRecoveryRequest": "Enviando solicitud de recuperación",
                    "pleaseWaitAgain": "Por favor, espere un momento...",
                    "requestSent": "Solicitud enviada",
                    "checkEmailForRecoveryCode": "Revisa tu correo para obtener el código de recuperación",
                    "resendingCode": "Enviando código nuevamente",
                    "pleaseWaitResend": "Por favor, espere un momento...",
                    "error": "Error",
                    "loginError": "Hubo un problema al iniciar sesión. Inténtalo nuevamente.",
                    "registrationError": "Error al registrar. Intenta nuevamente.",
                    "passwordRecoveryError": "Error al recuperar la contraseña. Intenta nuevamente.",
                    "codeVerified": "Código verificado",
                    "codeVerificationSuccess": "Tu código ha sido verificado correctamente.",
                    "accept": "Aceptar",
                    "userCreated": "Usuario creado correctamente",
                    "accountCreated": "Tu cuenta ha sido creada con éxito.",
                    "codeVerificationError": "Error al verificar el código. Intenta nuevamente.",
                    

                },
                home: {
                    "recentActivity": "Actividad Reciente",
                    "statusesOfTheProcedures": "Estado de los Procesamientos",
                    "dailyProcessing": "Procesamientos por Días (Últimos 7 días)",
                    "numberOfWells": "Cantidad De Pozos",
                    "numberOfProcessings": "Cantidad De Procesamientos",

                },
                createJobs: {
                    "createJob": "Crear Procesamiento",
                    "TypeOfProcessings": "Tipo De Procesamiento",
                    "selectAnalysisWindow": "Seleccionar Ventana de Análisis",
                    "start": "Inicio",
                    "end": "Fin",
                    "tolerance": "Tolerancia (%)",
                    "sedimentationRate": "Tasa de Sedimentación",
                    "graphsJob": "Gráficos de Procesamiento",
                    "instructionGraphs": "Este procesamiento creara los siguientes gráficos",
                    "instructionPrediction": "Este proceso determinara la probabilidad de encontrar petroleo o gas basado en la concentración de rayos gamma",
                    "predictionJob": "Proceso De Predicción",
                    "graphsJobs": "Graficos Del Proceso",

                },
                graphs: {
                    "depthVsGammaRayChart": "Gráfico de profundidad versus rayos gamma",
                    "gammaRayHistogram": "Histograma de rayos gamma",
                    "scatterPlotGammaRay": "Diagrama de dispersión de rayos gamma",
                    "depthVsBulkDensityChart": "Gráfico de profundidad versus densidad",
                    "bulkDensityHistogram": "Histograma de densidad",
                    "scatterPlotBulkDensity": "Diagrama de dispersión de densidad",
                    "depthVsNeutronPorosityChart": "Gráfico de profundidad versus porosidad de neutrones",
                    "neutronPorosityHistogram": "Histograma de porosidad de neutrones",
                    "scatterPlotNeutronPorosity": "Diagrama de dispersión de porosidad de neutrones",
                    "missingValues": "Valores faltantes",
                    "heatmapVariableCorrelations": "Mapa de calor de correlaciones de variables",
                    "multipleCurvePlot": "Gráfico de múltiples curvas",
                    "pairplotVariables": "Gráfico de pares de variables",
                    "Depth versus Gamma Ray chart": "Gráfico de profundidad versus rayos gamma",
                    "Gamma Ray Histogram": "Histograma de rayos gamma",
                    "Scatter Plot of Gamma Ray": "Diagrama de dispersión de rayos gamma",
                    "Depth versus Bulk Density chart": "Gráfico de profundidad versus densidad",
                    "Bulk Density Histogram": "Histograma de densidad",
                    "Scatter Plot of Bulk Density": "Diagrama de dispersión de densidad",
                    "Depth versus Neutron Porosity chart": "Gráfico de profundidad versus porosidad de neutrones",
                    "Neutron Porosity Histogram": "Histograma de porosidad de neutrones",
                    "Scatter Plot of Neutron Porosity": "Diagrama de dispersión de porosidad de neutrones",
                    "Missing Values": "Valores faltantes",
                    "Heatmap of Variable Correlations": "Mapa de calor de correlaciones de variables",
                    "Multiple Curve Plot": "Gráfico de múltiples curvas",
                    "Pairplot of Variables": "Gráfico de pares de variables"
                },
                jobsDetails: {
                    "jobDetail": "Detalles del Proceso",
                    "jobInformation": "Información del Proceso",
                    "resultGraphs": "Resultado de los Gráficos",
                    "reason": "Razón",
                    "graphsDetails": "Detalles del Gráfico", 
                    "eccentricity": "Excentricidad",
                    "obliquity": "Oblicuidad",
                    "precession": "Precesión",
                    "predictionsGraph": "Gráfico de Predicción",
                     "orderByDepth": "Ordenar por Profundidad",
                     "orderByOilProbability": "Ordenar por Probabilidad de Petróleo"


                },
                wellDetails: {
                    "description": "Descripción",
                    "fileLas": "Archivo LAS",
                    "depthRange": "Intervalo de Profundidades",
                    "frequencyRange": "Intervalo de Frecuencia",
                    "massDensityRange": "Intervalo de Densidad de Masa",
                    "gammaRayRange": "Intervalo de Rayos Gamma",
                    "neutronPorosityRange": "Intervalo de Porosidad de Neutrones",
                    "processingGraphs": "Gráfico del Procesamiento",
                    "graphsDetails": "Detalles del Gráfico",
                    "apiNumber": "ID del Pozo",
                    "company": "Compañía",
                    "country": "País",
                    "county": "Código de País",
                    "field": "Campo",
                    "nation": "Nacionalidad",
                    "nullValue": "Valor de Sin Datos",
                    "provinceBasin": "Pozo en Plataforma",
                    "provinceBasinSub": "Sección del Pozo",
                    "province": "Provincia",
                    "state": "País",
                    "step": "Paso",
                    "stop": "Profundidad Final",
                    "strt": "Profundidad Inicial",
                    "wellboreName": "Nombre del Pozo Perforado",
                    "wellName": "Nombre del Pozo"
               

                },
                layout: {
                    "home": "Inicio",
                    "wells": "Pozos",
                    "processing": "Procesamientos",
                    "account": "Cuenta",
                    "logout": "Salir"
                },
                login: {
                    "logIn": "Iniciar sesión",
                    "email": "Correo electrónico",
                    "password": "Contraseña",
                    "continue": "Continuar",
                    "forgotYourPassword": "Olvidaste tu contraseña?",
                    "messageRegister": "Inicia sesión para acceder a tu cuenta y disfrutar de nuestros servicios. ¿No tienes una cuenta? Regístrate aquí para empezar.",
                    "signUpNow": "Regístrate ahora",
                    "errorEmail": "El correo electrónico es obligatorio.",
                    "errorPassword": "La contraseña es obligatoria."

                },
                recoverPassword: {
                    "recoverPassword": "Recuperar contraseña",
                    "enterYourEmail": "Ingresa tu correo para restablecer tu contraseña",
                    "email": "Correo electrónico",
                    "invalidEmail": "El correo electrónico no es válido"
                },

                verifyCode:{
                    "verifyCode": "Verificación de Código",
                    "sentCode": "Te hemos enviado un código de 6 dígitos a tu correo electrónico",
                    "enterCode": "Ingresa código",
                    "codeExpiresIn": "El código expira en",
                    "verifyCodeAction": "Verificar código",
                    "resendCode": "Reenviar código",
                    "codeLengthError": "El código debe tener exactamente 6 dígitos.",
                    "seconds": "segundos",
                    "backToRegistration": "Volver a Registro"
                },
                register:{
                    "register": "Registrarse",
                    "firstName": "Nombre",
                    "lastName": "Apellido",
                    "email": "Correo electrónico",
                    "password": "Contraseña",
                    "firstNameRequired": "El nombre es obligatorio",
                    "lastNameRequired": "El apellido es obligatorio",
                    "emailRequired": "El correo electrónico es obligatorio",
                    "passwordRequired": "La contraseña es obligatoria",
                    "passwordMinLength": "La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo",
                    "repeatPassword": "Repetir contraseña",
                    "repeatPasswordRequired": "Debes repetir la contraseña",
                    "createAccount": "Crear Cuenta",
                    "emailFormatError": "El formato del correo electrónico es incorrecto",
                    "passwordFormatError": "La contraseña debe contener al menos un número y un símbolo",
                    "passwordsDoNotMatch": "Las contraseñas no coinciden"

                },
            

            },
        },
    },
    lng: "es",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});
