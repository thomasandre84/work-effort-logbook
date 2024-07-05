import { Component, inject, model, ChangeDetectionStrategy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatSelectModule} from '@angular/material/select';
import {CreateWorkTime} from "../work-time.model";

@Component({
  selector: 'app-work-time-creation-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule],
  templateUrl: './work-time-creation-dialog.component.html',
  styleUrl: './work-time-creation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkTimeCreationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WorkTimeCreationDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly workTime = model<CreateWorkTime>({workId: this.data.work.id, startTime: new Date(), endTime: new Date()});

  abort() {
    console.log('Abort');
    this.dialogRef.close();
  }

}
