import { clear, showHeader, showTable, showSuccess, showError, showWarning } from '../utils/ui.js';
import { ask, pause } from '../utils/readline.js';

// Plantilla base para menus CRUD usando Template Method
export class BaseCommand {
  constructor(title, entityName, service) {
    this.title = title;
    this.entityName = entityName;
    this.service = service;
  }

  // Metodo principal del ciclo del menu
  async execute() {
    while (true) {
      clear();
      showHeader(this.title);
      this.printMenuOptions();

      const opt = await ask('-> Elija una opción');

      if (opt === '0') {
        return;
      }

      const handled = await this.handleOption(opt);
      if (!handled) {
        showWarning('Opción inválida. Intente nuevamente.');
        await pause();
      }
    }
  }

  // Imprime las opciones del menu
  printMenuOptions() {
    console.log(`1. Registrar ${this.entityName}`);
    console.log(`2. Listar ${this.entityName}s`);
    console.log(`3. Actualizar ${this.entityName}`);
    console.log(`4. Eliminar ${this.entityName}`);
    console.log('0. Regresar');
  }

  // Manejo de la opcion elegida
  async handleOption(opt) {
    switch (opt) {
      case '1':
        await this.create();
        return true;
      case '2':
        await this.list();
        return true;
      case '3':
        await this.update();
        return true;
      case '4':
        await this.delete();
        return true;
      default:
        return false;
    }
  }

  // Crear registro
  async create() {
    clear();
    showHeader(this.title, `Registrar ${this.entityName}`);
    try {
      const data = await this.promptCreateData();
      if (!data) return;

      const result = await this.service.create(data);
      showSuccess(`${this.entityName} registrado con éxito! (ID: ${result.insertId})`);
    } catch (error) {
      showError(`Error al registrar ${this.entityName}: ${error.message}`);
    }
    await pause();
  }

  // Listar registros
  async list() {
    clear();
    showHeader(this.title, `Listado de ${this.entityName}s`);
    try {
      const records = await this.fetchListRecords();
      showTable(records);
    } catch (error) {
      showError(`Error al listar ${this.entityName}s: ${error.message}`);
    }
    await pause();
  }

  // Actualizar registro
  async update() {
    clear();
    showHeader(this.title, `Actualizar ${this.entityName}`);
    try {
      const id = await ask(`ID del ${this.entityName} a actualizar`);
      const existing = await this.service.getById(id);

      if (!existing) {
        showWarning(`${this.entityName} con ID ${id} no encontrado.`);
        await pause();
        return;
      }

      console.log(`\nModificando ${this.entityName} (ID: ${id})`);
      const updatedData = await this.promptUpdateData(existing);
      if (!updatedData) return;

      const result = await this.service.update(id, updatedData);
      if (result.affectedRows > 0) {
        showSuccess(`${this.entityName} actualizado con éxito!`);
      } else {
        showWarning('No se realizaron cambios en el registro.');
      }
    } catch (error) {
      showError(`Error al actualizar ${this.entityName}: ${error.message}`);
    }
    await pause();
  }

  // Eliminar registro
  async delete() {
    clear();
    showHeader(this.title, `Eliminar ${this.entityName}`);
    try {
      const id = await ask(`ID del ${this.entityName} a eliminar`);
      const existing = await this.service.getById(id);

      if (!existing) {
        showWarning(`${this.entityName} con ID ${id} no encontrado.`);
        await pause();
        return;
      }

      const result = await this.service.delete(id);
      if (result.affectedRows > 0) {
        showSuccess(`${this.entityName} eliminado con éxito!`);
      } else {
        showWarning('No se pudo eliminar el registro.');
      }
    } catch (error) {
      showError(`Error al eliminar ${this.entityName}: ${error.message}`);
    }
    await pause();
  }

  async fetchListRecords() {
    return await this.service.getAll();
  }

  async promptCreateData() {
    throw new Error('Debe implementar el método promptCreateData()');
  }

  async promptUpdateData(existing) {
    throw new Error('Debe implementar el método promptUpdateData()');
  }
}

export default BaseCommand;
