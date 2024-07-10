import {Component, input} from '@angular/core';

import {type Work} from "../work.model";

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
  work = input.required<Work>();
}
