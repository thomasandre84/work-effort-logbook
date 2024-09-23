import {Component, DestroyRef, OnInit, output, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {WorkService} from "./work.service";
import {WorkComponent} from "./work/work.component";
import {WorkTimeComponent}  from "./work-time/work-time.component";
import {type CreateWork, type Work} from "./work.model";
import {FormsModule} from "@angular/forms";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { WorkTimeService } from "./work-time.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WorkComponent, FormsModule, NgbDropdownModule, WorkTimeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isFetching = signal(false);
  works = this.workService.loadedWorks;
  workName: string = '';
  selectedWork?: Work;
  workTimes = this.workTimeService.loadedWorkTimes;

  constructor(private workService: WorkService,
              private workTimeService: WorkTimeService,
              private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    this.isFetching.set(true);
    this.fetchWorks();
    this.isFetching.set(false);
  }

  fetchWorks() {
    const subscription = this.workService.fetchWorks().subscribe({
      error: (error: any) => console.log('error', error),
      complete: () => console.log('complete')
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  createWork() {
    const createWork: CreateWork = { name: this.workName };
    const subscription = this.workService.addWork(createWork).subscribe({
      next: (work) => {
        console.log('create work: ', work);
      },
      complete: () => this.fetchWorks()
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onDeleteWork(work: Work) {
    console.log("Deleting " + work);
    this.workService.deleteWork(work).subscribe({
      complete: () => this.fetchWorks()
    });
  }

  onSelectWork(work: Work) {
    console.log("Selecting " + work);
    this.selectedWork = work;
  }

  onEditWork(work: Work) {
    console.log("Editing " + work);
  }

  onSubmit() {
    this.createWork();
  }
}
