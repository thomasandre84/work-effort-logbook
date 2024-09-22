import {Injectable, signal} from "@angular/core";

import {type CreateWorkTime, type WorkTime} from "./work-time/work-time.model";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import { Work } from "./work.model";

@Injectable({providedIn: 'root'})
export class WorkTimeService {
  private workTimes = signal<WorkTime[]>([]);

  loadedWorks = this.workTimes.asReadonly();

  constructor(private httpClient: HttpClient) {
  }


  addWorkTime(workTime: CreateWorkTime) {
    console.log('addWorkTime', workTime);
    return this.httpClient.post('http://localhost:8080/worktimes/work', workTime);
  }

  fetchWorkTimes(work: Work) {
    return this.httpClient.get<WorkTime[]>(`http://localhost:8080/worktimes/work/${work.id}`)
      .pipe(
        tap({
          next: (worktimes) => {
            console.log('worktimes', worktimes);
            this.workTimes.set(worktimes);
          }
        })
      );
  }

  deleteWork(worktime: WorkTime) {
    return this.httpClient.delete(`http://localhost:8080/worktimes/work/${worktime.id}`);
  }
}
