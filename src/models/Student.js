import { Person } from './Person.js';

export class Student extends Person {
  constructor(data = {}) {
    super(data);
    this.code = data.code || '';
    this.gender = data.gender || '';
    this.birthdate = data.birthdate || null;
    this.address = data.address || '';
    this.cityId = Number(data.cityId || data.city_id) || null;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      code: this.code,
      gender: this.gender,
      birthdate: this.birthdate,
      address: this.address,
      cityId: this.cityId
    };
  }
}

export default Student;
