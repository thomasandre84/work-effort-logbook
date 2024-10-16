import {Injectable, signal} from "@angular/core";

import {type CreateWork, type Work} from "./work.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkService {
  private readonly works = signal<Work[]>([]);
  private readonly backendUrl = 'http://localhost:8085';

  loadedWorks = this.works.asReadonly();

  constructor(private readonly httpClient: HttpClient) {
  }


  addWork(work: CreateWork) {
    console.log('addWork', work);
    return this.httpClient.post(`${this.backendUrl}/works`, work);

  }

  fetchWorks() {
    return this.httpClient.get<Work[]>(`${this.backendUrl}/works`)
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
    return this.httpClient.delete(`${this.backendUrl}/works/${work.id}`);
  }
}
