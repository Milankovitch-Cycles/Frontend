const apiClient = async (endpoint, datos = null, token = null, method = 'GET') => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  try {
    const body = datos ? JSON.stringify(datos) : null;
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body,
    });

    if (response.status !== 200) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.detail || 'Unknown error'}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};

export const register = (datos) => apiClient('auth/register/start', datos, null, 'POST');
export const registerFinish = (datos, token) => apiClient('auth/register/finish', datos, token, 'POST');
export const login = (datos) => apiClient('auth/login', datos, null, 'POST');
export const resetStart = (datos) => apiClient('auth/password/reset/start', datos, null, 'POST');
export const resetVerify = (datos, token) => apiClient('auth/password/reset/verify', datos, token, 'POST');
export const resetFinish = (datos, token) => apiClient('auth/password/reset/finish', datos, token, 'POST');
export const createWell = (datos, token) => apiClient('wells/', datos, token, 'POST');
export const getWells = (token, limit = 5, offset = 0) => apiClient(`wells?limit=${limit}&offset=${offset}`, null, token);