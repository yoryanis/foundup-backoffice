import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsReportComponent } from './modal-details-report.component';

describe('ModalDetailsReportComponent', () => {
  let component: ModalDetailsReportComponent;
  let fixture: ComponentFixture<ModalDetailsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
