/**
 * Clase base para todas las entidades del sistema
 */
export class BaseEntity {
  constructor(id = null) {
    this.id = id !== null && id !== undefined ? Number(id) : null;
  }

  toJSON() {
    return { id: this.id };
  }
}

export default BaseEntity;
