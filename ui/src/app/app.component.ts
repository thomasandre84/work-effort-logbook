import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {WorkService} from "./work.service";
import {WorkComponent} from "./work/work.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WorkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private workService: WorkService) {
  }

  get works() {
    return this.workService.works;
  }
}
