import { Component } from '@angular/core';
import { WorkTimeDialogComponent } from "./work-time-dialog/work-time-dialog.component";
import {WorkTimeService} from "./work-time.service";

@Component({
    selector: 'app-work-time',
    standalone: true,
    templateUrl: './work-time.component.html',
    styleUrl: './work-time.component.scss',
    imports: [WorkTimeDialogComponent]
})
export class WorkTimeComponent {

  constructor(private workTimeService: WorkTimeService) {
  }

  // TODO: getWorkTimes By WorkId only
  get workTimes() {
    return this.workTimeService.workTimes;
  }
}
