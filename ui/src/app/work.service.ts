import {Injectable, signal} from "@angular/core";

import {type CreateWork, type Work} from "./work.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkService {
  private works = signal<Work[]>([]);
  private backendUrl = 'http://localhost:8085/works';

  loadedWorks = this.works.asReadonly();

  constructor(private httpClient: HttpClient) {
  }


  addWork(work: CreateWork) {
    console.log('addWork', work);
    return this.httpClient.post(this.backendUrl, work);

  }

  fetchWorks() {
    return this.httpClient.get<Work[]>(this.backendUrl)
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
    return this.httpClient.delete(`${this.backendUrl}/${work.id}`);
  }
}
