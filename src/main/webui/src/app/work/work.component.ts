import {Component, input, output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import {type Work} from "../work.model";

@Component({
    selector: 'app-work',
    imports: [MatButtonModule, MatMenuModule],
    templateUrl: './work.component.html',
    styleUrl: './work.component.scss'
})
export class WorkComponent {
  work = input.required<Work>();
  delete = output<Work>();
  edit = output<Work>();
  select = output<Work>();

  onDeleteWork() {
    //console.log("Delete "+ this.work);
    this.delete.emit(this.work());
  }

  onEditWork() {
    //console.log("Edit "+this.work);
    this.edit.emit(this.work());
  }

  onSelectWork() {
    //console.log("Selected: " + this.work);
    this.select.emit(this.work());
  }
}
