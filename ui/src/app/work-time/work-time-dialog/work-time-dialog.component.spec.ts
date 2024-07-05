import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimeDialogComponent } from './work-time-dialog.component';

describe('WorkTimeDialogComponent', () => {
  let component: WorkTimeDialogComponent;
  let fixture: ComponentFixture<WorkTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTimeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
