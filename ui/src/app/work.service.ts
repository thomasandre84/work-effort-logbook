import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class WorkService {
  workList = [
    {id: '1', name: 'Work 1', status: 'In Progress'},
    {id: '2', name: 'Work 2', status: 'In Progress'},
  ]

  get works() {
    return this.workList;
  }
}
