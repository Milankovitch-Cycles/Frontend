const apiClient = async (endpoint, datos) => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
  
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
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
  
  export const register = (datos) => apiClient('auth/register/start', datos);
  