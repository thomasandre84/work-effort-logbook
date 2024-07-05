import {Component, input, output} from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {type Work} from "../work.model";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [NgbDropdownModule],
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
    this.edit.emit(this.work());
  }
}
