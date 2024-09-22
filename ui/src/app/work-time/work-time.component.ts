import {Component, DestroyRef, input} from '@angular/core';
import { WorkTimeDialogComponent } from "./work-time-dialog/work-time-dialog.component";
import {WorkTimeService} from "./work-time.service";
import type {Work} from "../work.model";
import {WorkTime} from "./work-time.model";
import {WorkService} from "../work.service";

@Component({
    selector: 'app-work-time',
    standalone: true,
    templateUrl: './work-time.component.html',
    styleUrl: './work-time.component.scss',
    imports: [WorkTimeDialogComponent]
})
export class WorkTimeComponent {
  work = input.required<Work>();


  // TODO: getWorkTimes By WorkId only

}
