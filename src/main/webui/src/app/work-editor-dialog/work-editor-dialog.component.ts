import {Component, inject, model} from '@angular/core';
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
import type {UpdateWork, Work} from "../work.model";


import {MatSelectModule} from '@angular/material/select';



@Component({
    selector: 'app-work-editor-dialog',
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatButtonModule,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatSelectModule
    ],
    templateUrl: './work-editor-dialog.component.html',
    styleUrl: './work-editor-dialog.component.scss'
})
export class WorkEditorDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WorkEditorDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly updateWork = model<UpdateWork>({name: this.data.work.name, status: this.data.work.status});


  abort() {
    console.log('Abort');
    this.dialogRef.close();
  }
}
