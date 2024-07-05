import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeCreationDialogComponent } from './work-time-creation-dialog.component';

describe('WorkTimeCreationDialogComponent', () => {
  let component: WorkTimeCreationDialogComponent;
  let fixture: ComponentFixture<WorkTimeCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTimeCreationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTimeCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
