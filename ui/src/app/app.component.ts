import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {WorkService} from "./work.service";
import {WorkComponent} from "./work/work.component";
import {type work} from "./work.model";

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

  createWork() {

    const id: string = Math.random().toString(36).substring(7);
    const name : string = 'Work ' + id;
    const work: work = {id: id, name: name, status: 'In Progress'};
    this.workService.addWork(work);
  }
}
