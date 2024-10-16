import {Injectable, signal} from "@angular/core";

import {type CreateWorkTime, type WorkTime} from "./work-time.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import { Work } from "./work.model";

@Injectable({providedIn: 'root'})
export class WorkTimeService {
  private readonly workTimes = signal<WorkTime[]>([]);
  private readonly backendUrl = 'http://localhost:8085';

  loadedWorkTimes = this.workTimes.asReadonly();

  constructor(private readonly httpClient: HttpClient) {
  }


  addWorkTime(workTime: CreateWorkTime) {
    console.log('addWorkTime', workTime);
    return this.httpClient.post(`${this.backendUrl}/worktimes`, workTime);
  }

  fetchWorkTimes(work: Work) {
    return this.httpClient.get<WorkTime[]>(`${this.backendUrl}/worktimes/work/${work.id}`)
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
    return this.httpClient.delete(`${this.backendUrl}/worktimes/${worktime.id}`);
  }
}
