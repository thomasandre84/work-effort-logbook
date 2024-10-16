import {Component, input} from '@angular/core';
import { WorkTimeDialogComponent } from "./work-time-dialog/work-time-dialog.component";
import {WorkTime} from "../work-time.model";

@Component({
    selector: 'app-work-time',
    standalone: true,
    templateUrl: './work-time.component.html',
    styleUrl: './work-time.component.scss',
    imports: [WorkTimeDialogComponent]
})
export class WorkTimeComponent {
  workTime = input.required<WorkTime>();

  getStartTime() {
    return new Date(this.workTime().startTime).toLocaleString();
  }

  getEndTime() {
    return new Date(this.workTime().endTime).toLocaleString();
  }

}
