import {ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {WorkService} from "./work.service";
import {WorkComponent} from "./work/work.component";
import {WorkTimeComponent}  from "./work-time/work-time.component";
import {type CreateWork, type Work} from "./work.model";
import {FormsModule} from "@angular/forms";
import { WorkTimeService } from "./work-time.service";
import {WorkEditorDialogComponent} from "./work-editor-dialog/work-editor-dialog.component";

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {WorkTimeCreationDialogComponent} from "./work-time-creation-dialog/work-time-creation-dialog.component";

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, WorkComponent, FormsModule, WorkTimeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  isFetching = signal(false);
  works = this.workService.loadedWorks;
  status = this.workService.loadedStatus;
  workName: string = '';
  selectedWork?: Work;
  workTimes = this.workTimeService.loadedWorkTimes;
  startTime: Date = new Date();

  constructor(private workService: WorkService,
              private workTimeService: WorkTimeService,
              private destroyRef: DestroyRef,
              readonly dialog: MatDialog) {
  }

  ngOnInit() {
    this.isFetching.set(true);
    this.fetchWorks();
    this.fetchStatus();
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

  fetchStatus() {
    const subscription = this.workService.fetchStatus().subscribe({
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
    const subscription = this.workService.deleteWork(work).subscribe({
      complete: () => this.fetchWorks()
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectWork(work: Work) {
    console.log("Selecting " + work);
    const subscription = this.workTimeService.fetchWorkTimes(work).subscribe({
      error: (error: any) => console.log('error', error),
      complete: () => console.log('complete')
    });
    this.selectedWork = work;

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onEditWork(work: Work) {
    console.log("Editing " + work.name);
    // open dialog
    const dialogRef = this.dialog.open(WorkEditorDialogComponent, {
      data: {
        work,
        status: this.status()
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed with result: ${result}`);
      if (result !== undefined) {
        if (result.status != work.status){
          //const updateWork: UpdateWork
          const subscription = this.workService.updateWork(result, work.id).subscribe({
            complete: () => this.fetchWorks()
          });

          this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
          });
        }
      }
    });
  }

  createWorkTime(work: Work) {
    console.log("Create a new WorkTime");
    const dialogRef = this.dialog.open(WorkTimeCreationDialogComponent, {
      data: {
        work: work
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed with result: ${result}`);
      if (result !== undefined) {
        if (result.startTime !== undefined ){
          const subscription = this.workTimeService.addWorkTime(result).subscribe({
            complete: () => this.workTimeService.fetchWorkTimes(work).subscribe()
          });
          //
          this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
          });
        }
      }
    });
  }
}



