import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Category } from '../../../entities/index';
import { CategoryService, GlobalService } from '../../../services/index';

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss'],
})
export class ModalAddCategoryComponent implements OnInit {
  public categoryForm!: FormGroup;
  public categoryDataCopy!: Category;

  constructor(
    @Inject(MAT_DIALOG_DATA) public categoryData: any,
    public dialogRef: MatDialogRef<ModalAddCategoryComponent>,
    private formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly globalService: GlobalService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.categoryDataCopy = new Category(
      this.categoryData.id ? this.categoryData : ''
    );
    this.patchValue();
  }

  get f() {
    return this.categoryForm.controls;
  }

  public onClose(refresh: boolean): void {
    this.dialogRef.close(refresh);
  }

  public onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    if (this.categoryDataCopy.id) {
      this.categoryService
        .update(this.categoryForm.value, this.categoryDataCopy.id)
        .subscribe((res) => {
          this.onClose(true);
        });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe((res) => {
        if (res.code > 1000) this.onClose(true);
      });
    }
  }

  private createForm() {
    this.categoryForm = this.formBuilder.group({
      category: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  private patchValue() {
    this.categoryForm.patchValue({
      category: this.categoryDataCopy.category,
    });
  }
}
