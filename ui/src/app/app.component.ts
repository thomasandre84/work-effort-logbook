import {Component, DestroyRef, OnInit, output, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {WorkService} from "./work.service";
import {WorkComponent} from "./work/work.component";
import {type CreateWork, type Work} from "./work.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WorkComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isFetching = signal(false);
  works = this.workService.loadedWorks;
  workName: string = '';

  constructor(private workService: WorkService,
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
  }

  onSelectWork(work: Work) {
    console.log("Selecting " + work);
  }

  onEditWork(work: Work) {
    console.log("Editing " + work);
  }

  onSubmit() {
    this.createWork();
  }
}
