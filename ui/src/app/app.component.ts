import {Component, DestroyRef, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {WorkService} from "./work.service";
import {WorkComponent} from "./work/work.component";
import {type CreateWork} from "./work.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WorkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isFetching = signal(false);
  works = this.workService.loadedWorks;

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

    const name : string = 'Work ' + Math.random().toString(36).substring(7);
    const updateWork: CreateWork = { name: name };
    const subscription = this.workService.addWork(updateWork).subscribe({
      next: (work) => {
        console.log('create work: ', work);
      },
      complete: () => this.fetchWorks()
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
