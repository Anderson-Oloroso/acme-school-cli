import { createInterface } from 'readline/promises';
import { stdin, stdout } from 'process';

export const rl = createInterface({
  input: stdin,
  output: stdout
});

/**
 * Realiza una pregunta por consola con soporte opcional de validación y valor por defecto
 * @param {string} question - Texto de la pregunta
 * @param {Function} [validator] - Función validadora que retorna string si hay error o null si es válido
 * @param {string|number} [defaultValue] - Valor por defecto si se presiona ENTER
 * @returns {Promise<string>}
 */
export async function ask(question, validator = null, defaultValue = null) {
  const prompt = defaultValue !== null && defaultValue !== undefined
    ? `${question} [${defaultValue}]: `
    : `${question}: `;

  while (true) {
    const input = await rl.question(prompt);
    const value = input.trim() === '' && defaultValue !== null ? String(defaultValue) : input.trim();

    if (validator && typeof validator === 'function') {
      const error = validator(value);
      if (error) {
        console.log(`\x1b[31m${error}\x1b[0m`);
        continue;
      }
    }

    return value;
  }
}

/**
 * Pausa la ejecución de la consola hasta que el usuario presione ENTER
 * @param {string} [message]
 */
export async function pause(message = 'Presione una tecla para continuar...') {
  await rl.question(`\n${message}`);
}

/**
 * Solicita una confirmación S/N
 * @param {string} question 
 * @param {boolean} defaultYes 
 * @returns {Promise<boolean>}
 */
export async function confirm(question, defaultYes = true) {
  const prompt = `${question} (${defaultYes ? 'S/n' : 's/N'}): `;
  const answer = (await rl.question(prompt)).trim().toLowerCase();
  if (!answer) return defaultYes;
  return answer === 's' || answer === 'si' || answer === 'y' || answer === 'yes';
}

export function closeReadline() {
  rl.close();
}

export default {
  rl,
  ask,
  pause,
  confirm,
  closeReadline
};
