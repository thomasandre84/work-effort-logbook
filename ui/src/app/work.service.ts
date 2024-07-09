import {Injectable} from "@angular/core";

import {type work} from "./work.model";

@Injectable({providedIn: 'root'})
export class WorkService {
  workList: work[] = [
    {id: '1', name: 'Work 1', status: 'In Progress'},
    {id: '2', name: 'Work 2', status: 'In Progress'},
  ]

  constructor() {
    const works = localStorage.getItem('works');
    if (works !== null) {
      this.workList = JSON.parse(works);
    }
  }

  addWork(work: work) {
    console.log('addWork', work);
    this.workList.push(work);
    console.log('workList', this.workList);
    localStorage.setItem('works', JSON.stringify(this.workList));
  }

  get works() {
    return this.workList;
  }
}
