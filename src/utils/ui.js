export function clear() {
  console.clear();
}

export function showBanner() {
  console.log('======================================================');
  console.log('             ACME SCHOOL - SISTEMA DE GESTION         ');
  console.log('======================================================');
}

export function showHeader(title, subtitle = '') {
  console.log('======================================================');
  console.log(` ${title.toUpperCase()}`);
  if (subtitle) {
    console.log(` ==> ${subtitle}`);
  }
  console.log('======================================================');
}

export function showTable(data) {
  if (!data || data.length === 0) {
    console.log('\nNo hay registros disponibles.');
  } else {
    console.table(data);
  }
}

export function showSuccess(message) {
  console.log(`\n\x1b[32m✔ ${message}\x1b[0m`);
}

export function showError(message) {
  console.log(`\n\x1b[31m✖ ${message}\x1b[0m`);
}

export function showWarning(message) {
  console.log(`\n\x1b[33m⚠ ${message}\x1b[0m`);
}

export function showInfo(message) {
  console.log(`\n\x1b[36mℹ ${message}\x1b[0m`);
}

export default {
  clear,
  showBanner,
  showHeader,
  showTable,
  showSuccess,
  showError,
  showWarning,
  showInfo
};
