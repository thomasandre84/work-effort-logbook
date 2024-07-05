import {Injectable} from "@angular/core";

@Injectable()
export class WorkTimeService {
  workTimesList = [
    {id: '1', workId: '1', startTime: new Date(), endTime: new Date()},
    {id: '2', workId: '2', startTime: new Date(), endTime: new Date()},
    ];

  get workTimes() {
    return this.workTimesList;
  }
}
