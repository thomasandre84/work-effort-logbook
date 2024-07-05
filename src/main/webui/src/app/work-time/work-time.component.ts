import {Component, input, LOCALE_ID, Inject} from '@angular/core';
import {formatDate} from '@angular/common';
import {WorkTime} from "../work-time.model";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-work-time',
    templateUrl: './work-time.component.html',
    styleUrl: './work-time.component.scss',
    imports: [MatCardModule, MatButtonModule]
})
export class WorkTimeComponent {
  workTime = input.required<WorkTime>();

  constructor(@Inject(LOCALE_ID) public locale: string){
  } 
  

  getStartTime() {
    return formatDate(this.workTime().startTime,'yyyy-MM-dd HH:mm', this.locale);
  }

  getEndTime() {
   return formatDate(this.workTime().endTime,'yyyy-MM-dd HH:mm', this.locale);
  }

}
