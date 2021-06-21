import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAdminComponent } from './modal-add-admin.component';

describe('ModalAddAdminComponent', () => {
  let component: ModalAddAdminComponent;
  let fixture: ComponentFixture<ModalAddAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
