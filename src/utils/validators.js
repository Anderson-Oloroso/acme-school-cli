// Validaciones de entradas de usuario

export const validateRequired = (fieldName = 'Campo') => (value) => {
  if (value === null || value === undefined || String(value).trim() === '') {
    return `El campo "${fieldName}" es obligatorio.`;
  }
  return null;
};

export const validateLength = (fieldName = 'Campo', min = 1, max = 255) => (value) => {
  const str = String(value || '').trim();
  if (str.length < min) {
    return `"${fieldName}" debe tener al menos ${min} caracteres.`;
  }
  if (str.length > max) {
    return `"${fieldName}" no puede superar los ${max} caracteres.`;
  }
  return null;
};

export const validateEmail = (value) => {
  if (!value || String(value).trim() === '') {
    return 'El correo electrónico es obligatorio.';
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(String(value).trim())) {
    return 'Formato de correo electrónico inválido (ejemplo: usuario@correo.com).';
  }
  return null;
};

export const validateInteger = (fieldName = 'Campo', min = null, max = null) => (value) => {
  const num = Number(value);
  if (isNaN(num) || !Number.isInteger(num)) {
    return `"${fieldName}" debe ser un número entero.`;
  }
  if (min !== null && num < min) {
    return `"${fieldName}" debe ser mayor o igual a ${min}.`;
  }
  if (max !== null && num > max) {
    return `"${fieldName}" debe ser menor o igual a ${max}.`;
  }
  return null;
};

export const validateDecimal = (fieldName = 'Campo', min = null, max = null) => (value) => {
  const num = Number(value);
  if (isNaN(num)) {
    return `"${fieldName}" debe ser un número decimal válido.`;
  }
  if (min !== null && num < min) {
    return `"${fieldName}" debe ser mayor o igual a ${min}.`;
  }
  if (max !== null && num > max) {
    return `"${fieldName}" debe ser menor o igual a ${max}.`;
  }
  return null;
};

export const validateDate = (fieldName = 'Fecha') => (value) => {
  if (!value || String(value).trim() === '') {
    return `"${fieldName}" es obligatoria.`;
  }
  const str = String(value).trim();
  const regex = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/;
  if (!regex.test(str)) {
    return `"${fieldName}" debe tener el formato YYYY-MM-DD o YYYY-MM-DD HH:mm:ss.`;
  }
  return null;
};

export const validateActive = (value) => {
  const str = String(value).trim();
  if (str !== '0' && str !== '1') {
    return 'El estado debe ser 1 (Activo) o 0 (Inactivo).';
  }
  return null;
};

export default {
  validateRequired,
  validateLength,
  validateEmail,
  validateInteger,
  validateDecimal,
  validateDate,
  validateActive
};
