import {Injectable, signal} from "@angular/core";

import {type CreateWorkTime, type WorkTime} from "./work-time.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import { Work } from "./work.model";

@Injectable({providedIn: 'root'})
export class WorkTimeService {
  private workTimes = signal<WorkTime[]>([]);
  private backendUrl = 'http://localhost:8085/worktimes';

  loadedWorkTimes = this.workTimes.asReadonly();

  constructor(private httpClient: HttpClient) {
  }


  addWorkTime(workTime: CreateWorkTime) {
    console.log('addWorkTime', workTime);
    return this.httpClient.post(this.backendUrl, workTime);
  }

  fetchWorkTimes(work: Work) {
    return this.httpClient.get<WorkTime[]>(`${this.backendUrl}/work/${work.id}`)
      .pipe(
        tap({
          next: (worktimes) => {
            console.log('worktimes', worktimes);
            this.workTimes.set(worktimes);
          }
        })
      );
  }

  deleteWorkTime(worktime: WorkTime) {
    return this.httpClient.delete(`${this.backendUrl}/work/${worktime.id}`);
  }
}
