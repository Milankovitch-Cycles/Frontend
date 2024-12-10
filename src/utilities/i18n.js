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
                    "description": "Description"
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
                    "reason": "Reason"

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
                    "description": "Descripción"
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
                    "reason": "Razón"


                },


            },
        },
    },
    lng: "es",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});
