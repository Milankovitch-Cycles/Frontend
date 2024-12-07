import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          wellProcessing: "Well Processing",  
          createJob: "Create Job",
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
          },
          jobsList: {
            "title": "Jobs List",
            "filter": "Filter: ",
          },
          pagination: {
            "rowsPerPage": "Rows per page",
          },
        },
      },
      es: {
        translation: {
          wellProcessing: "Procesamiento de Pozo", 
          createJob: "Crear Proceso", 
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
          },
          jobsList: {
            "title": "Procesos",
            "filter": "Filtrar: ",
          },
          pagination: {
            "rowsPerPage": "Filas por página",
          },
        },
      },
    },
    lng: "es", 
    fallbackLng: "en", 
    interpolation: { escapeValue: false },
  });
  