import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCategoryComponent } from './modal-add-category.component';

describe('ModalAddCategoryComponent', () => {
  let component: ModalAddCategoryComponent;
  let fixture: ComponentFixture<ModalAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
