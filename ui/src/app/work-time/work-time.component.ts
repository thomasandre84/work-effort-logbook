import { Component } from '@angular/core';
import { WorkTimeDialogComponent } from "./work-time-dialog/work-time-dialog.component";

@Component({
    selector: 'app-work-time',
    standalone: true,
    templateUrl: './work-time.component.html',
    styleUrl: './work-time.component.scss',
    imports: [WorkTimeDialogComponent]
})
export class WorkTimeComponent {

}
