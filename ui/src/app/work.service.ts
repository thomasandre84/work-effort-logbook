import {Injectable, signal} from "@angular/core";

import {type CreateWork, type Work} from "./work.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkService {
  private works = signal<Work[]>([]);

  loadedWorks = this.works.asReadonly();

  constructor(private httpClient: HttpClient) {
  }


  addWork(work: CreateWork) {
    console.log('addWork', work);
    return this.httpClient.post('http://localhost:8080/works', work);

  }

  fetchWorks() {
    return this.httpClient.get<Work[]>('http://localhost:8080/works')
      .pipe(
        tap({
          next: (works) => {
            console.log('works', works);
            this.works.set(works);
          }
        })
      );
  }

  deleteWork(work: Work) {
    return this.httpClient.delete(`http://localhost:8080/works/${work.id}`);
  }
}
