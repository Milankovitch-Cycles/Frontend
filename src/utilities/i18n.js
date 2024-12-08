import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                wellProcessing: "Well Processing",  
                createJob: "Create Job",
                addWell: "Add Well",
                type: {
                    "NEW_WELL": "New Well",
                    "MILANKOVIC_CYCLES": "Milankovic Cycles",
                    "PREDICTION": "Prediction"
                },
                status: {
                    "processed": "Processed",
                    "pending": "Pending",
                    "failed": "Failed",
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
            },
        },
        es: {
            translation: {
                wellProcessing: "Procesamiento de Pozo", 
                createJob: "Crear Proceso", 
                addWell: "Agregar Pozo",
                type: {
                    "NEW_WELL": "Nuevo Pozo",
                    "MILANKOVIC_CYCLES": "Ciclos de Milankovitch",
                    "PREDICTION": "Predicción"
                },
                status: {
                    "processed": "Procesado",
                    "pending": "Pendiente",
                    "failed": "Fallido",
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
            },
        },
    },
    lng: "es", 
    fallbackLng: "en", 
    interpolation: { escapeValue: false },
});
