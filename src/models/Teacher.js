import { Person } from './Person.js';

/**
 * Entidad Teacher que hereda de Person
 */
export class Teacher extends Person {
  constructor(data = {}) {
    super(data);
  }

  toJSON() {
    return {
      ...super.toJSON()
    };
  }
}

export default Teacher;
