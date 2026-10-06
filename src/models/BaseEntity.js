export class BaseEntity {
  constructor(id = null) {
    this.id = id !== null && id !== undefined ? Number(id) : null;
  }
}

export default BaseEntity;
