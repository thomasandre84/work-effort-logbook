import {Injectable, signal} from "@angular/core";
import { environment } from './../environments/environment';

import {UpdateWork, WorkStatus, type CreateWork, type Work} from "./work.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkService {
  private readonly works = signal<Work[]>([]);
  private readonly status = signal<string[]>([]);
  private backendUrl = '';

  loadedWorks = this.works.asReadonly();
  loadedStatus = this.status.asReadonly();

  constructor(private readonly httpClient: HttpClient) {
    console.log(this.backendUrl);
    this.backendUrl = environment.apiUrl;
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
  
  updateWork(updateWork: UpdateWork, workId: String) {
    return this.httpClient.patch(`${this.backendUrl}/works/${workId}`, updateWork);
  }

  fetchStatus() {
    return this.httpClient.get<string[]>(`${this.backendUrl}/works/status`)
      .pipe(
        tap({
          next: (status) => {
            console.log('Status', status);
            this.status.set(status);
          },
        })
      )
  }
}
