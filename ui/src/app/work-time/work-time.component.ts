import {Component, DestroyRef, input} from '@angular/core';
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


  // TODO: getWorkTimes By WorkId only

}
