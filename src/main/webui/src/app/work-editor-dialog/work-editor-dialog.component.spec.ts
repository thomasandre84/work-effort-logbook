import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEditorDialogComponent } from './work-editor-dialog.component';

describe('WorkEditorDialogComponent', () => {
  let component: WorkEditorDialogComponent;
  let fixture: ComponentFixture<WorkEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
