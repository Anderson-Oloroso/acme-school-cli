import { BaseEntity } from './BaseEntity.js';

export class Person extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';
    this.identification_type_id = data.identification_type_id || null;
    this.identification_number = data.identification_number || '';
    this.email = data.email || '';
  }

  getFullName() {
    return `${this.first_name} ${this.last_name}`.trim();
  }
}

export default Person;
