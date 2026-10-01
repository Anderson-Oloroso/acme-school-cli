export class BaseEntity {
  constructor(id = null) {
    this.id = id !== null && id !== undefined ? Number(id) : null;
  }

  toJSON() {
    return { id: this.id };
  }
}

export default BaseEntity;
