import { Subject } from 'rxjs';

export class SubjectManager {
  constructor() {
    this.subject = new Subject();
  }

  get getSubject() {
    return this.subject.asObservable();
  }

  set setSubject(value) {
    this.subject.next(value);
  }
}