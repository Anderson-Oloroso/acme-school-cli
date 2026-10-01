import { BaseEntity } from './BaseEntity.js';

export class Person extends BaseEntity {
  constructor(data = {}) {
    super(data.id);
    this.firstName = data.firstName || data.first_name || '';
    this.lastName = data.lastName || data.last_name || '';
    this.identificationTypeId = Number(data.identificationTypeId || data.identification_type_id) || null;
    this.identificationNumber = String(data.identificationNumber || data.identification_number || '');
    this.email = data.email || '';
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  toJSON() {
    return {
      ...super.toJSON(),
      firstName: this.firstName,
      lastName: this.lastName,
      identificationTypeId: this.identificationTypeId,
      identificationNumber: this.identificationNumber,
      email: this.email
    };
  }
}

export default Person;
