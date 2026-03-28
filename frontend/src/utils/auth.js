// Verificar si el token ha expirado (2 horas)
export const isTokenExpired = () => {
  const loginTime = localStorage.getItem('loginTime');
  
  if (!loginTime) {
    return true;
  }
  
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - parseInt(loginTime);
  const twoHours = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
  
  return elapsedTime > twoHours;
};

// Limpiar sesión
export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('loginTime');
};

// Guardar tiempo de login
export const saveLoginTime = () => {
  localStorage.setItem('loginTime', new Date().getTime().toString());
};