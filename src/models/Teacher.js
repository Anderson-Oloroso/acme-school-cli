import { Person } from './Person.js';

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
