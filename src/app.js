import { connectDB } from './config/database.js';
import { MainMenuCommand } from './commands/MainMenuCommand.js';
import { clear, showBanner, showError } from './utils/ui.js';
import { closeReadline, pause } from './utils/readline.js';

// Punto de entrada principal de la aplicacion
async function main() {
  clear();
  showBanner();

  console.log('Iniciando conexión con la base de datos MySQL...');
  const connection = await connectDB();

  if (!connection) {
    console.log('Verifique la configuración en el archivo .env y que el servicio de MySQL esté activo.');
    await pause('Presione ENTER para salir...');
    closeReadline();
    process.exit(1);
  }

  await pause('Presione ENTER para ingresar al sistema...');

  const mainMenu = new MainMenuCommand();
  await mainMenu.execute();
}

main().catch(async (error) => {
  showError(`Error crítico en la aplicación: ${error.message}`);
  closeReadline();
  process.exit(1);
});
