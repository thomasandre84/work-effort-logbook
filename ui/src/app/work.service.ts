import {Injectable, signal} from "@angular/core";

import {type CreateWork, type Work} from "./work.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkService {
  private works = signal<Work[]>([]);

  loadedWorks = this.works.asReadonly();

  constructor(private httpClient: HttpClient) {
    /*const works = localStorage.getItem('works');
    if (works !== null) {
      this.workList = JSON.parse(works);
    }*/
  }


  addWork(work: CreateWork) {
    console.log('addWork', work);
    /*this.workList.push(work);
    console.log('workList', this.workList);
    localStorage.setItem('works', JSON.stringify(this.workList));*/
    return this.httpClient.post('http://localhost:8080/works', work);

  }

  fetchWorks() {
    return this.httpClient.get<Work[]>('http://localhost:8080/works')
      .pipe(
        tap({
          next: (works) => {
            console.log('works', works);
            this.works.set(works);
            //localStorage.setItem('works', JSON.stringify(this.workList));
          }
        })
      );
  }

  deleteWork(work: Work) {
    return this.httpClient.delete(`http://localhost:8080/works/${work.id}`);
  }
}
