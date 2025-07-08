// Servicio para enviar notificaciones por correo
// Configuración del servicio de correos
const EMAIL_SERVICE_CONFIG = {
  baseUrl: "http://localhost:8080/comunicacion",
  timeout: 5000, // 5 segundos de timeout
};

// Función para generar timestamp de Java (millisegundos desde epoch)
const getJavaTimestamp = () => {
  return Date.now();
};

// Función genérica para hacer peticiones al servicio de correos
const makeEmailRequest = async (endpoint, data, type) => {
  try {
    console.log(`📧 Enviando email de ${type} para:`, { email: data.email, username: data.username });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), EMAIL_SERVICE_CONFIG.timeout);
    
    const response = await fetch(`${EMAIL_SERVICE_CONFIG.baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      console.log(`✅ Email de ${type} enviado exitosamente`);
      return true;
    } else {
      console.warn(`⚠️ Error al enviar email de ${type}:`, response.status);
      return false;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`⚠️ Timeout al enviar email de ${type}`);
    } else {
      console.warn(`⚠️ Servicio de correos no disponible (${type}):`, error.message);
    }
    // No lanzar error para no bloquear la operación principal
    return false;
  }
};

// Función para enviar notificación de registro
export const sendRegistrationEmail = async (email, username) => {
  const data = {
    email: email,
    username: username,
    timestamp: getJavaTimestamp()
  };
  
  return await makeEmailRequest("registered", data, "registro");
};

// Función para enviar notificación de login
export const sendLoginEmail = async (email, username) => {
  const data = {
    email: email,
    username: username,
    timestamp: getJavaTimestamp()
  };
  
  return await makeEmailRequest("logged", data, "login");
};
