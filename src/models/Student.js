import { Person } from './Person.js';

export class Student extends Person {
  constructor(data = {}) {
    super(data);
    this.code = data.code || '';
    this.gender = data.gender || '';
    this.birthdate = data.birthdate || null;
    this.address = data.address || '';
    this.city_id = data.city_id || null;
  }
}

export default Student;
