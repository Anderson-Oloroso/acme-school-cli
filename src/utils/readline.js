import { createInterface } from 'readline/promises';
import { stdin, stdout } from 'process';

export const rl = createInterface({
  input: stdin,
  output: stdout
});

// Pregunta por consola con soporte opcional de validacion y valor por defecto
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

// Pausa la ejecucion de la consola hasta presionar ENTER
export async function pause(message = 'Presione una tecla para continuar...') {
  await rl.question(`\n${message}`);
}

// Solicita una confirmacion S/N
export async function confirm(question, defaultYes = true) {
  const prompt = `${question} (${defaultYes ? 'S/n' : 's/N'}): `;
  const answer = (await rl.question(prompt)).trim().toLowerCase();
  if (!answer) return defaultYes;
  return answer === 's' || answer === 'si' || answer === 'y' || answer === 'yes';
}

// Cierra la interfaz de readline
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
