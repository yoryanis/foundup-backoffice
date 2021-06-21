import * as moment from 'moment';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { CITY, OCCUPATION } from 'src/app/entities/enum/index';
import { DATE_FORMAT } from '../../../utils/moment-format.util';
import { GlobalService, UserService } from 'src/app/services';
import { User } from 'src/app/entities';

@Component({
  selector: 'app-modal-add-admin',
  templateUrl: './modal-add-admin.component.html',
  styleUrls: ['./modal-add-admin.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class ModalAddAdminComponent implements OnInit {
  public adminForm!: FormGroup;
  public cities = CITY;
  public maxDate!: string;
  public occupations = OCCUPATION;
  public userDataCopy!: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private formBuilder: FormBuilder,
    private readonly globalService: GlobalService,
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<ModalAddAdminComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.userDataCopy = new User(this.userData.id ? this.userData : '');
    this.maxDate = this.getFormattedYear();
    this.patchValue();
  }

  get f() {
    return this.adminForm.controls;
  }

  public onClose(refresh: boolean): void {
    this.dialogRef.close(refresh);
  }

  public onSubmit() {
    if (this.adminForm.invalid) {
      return;
    }

    const data: User = {
      identification: this.adminForm.get('identification')?.value,
      name: this.adminForm.get('name')?.value,
      lastname: this.adminForm.get('lastname')?.value,
      role_id: 1,
      phone: this.adminForm.get('phone')?.value,
      occupation: this.adminForm.get('occupation')?.value,
      city: this.adminForm.get('city')?.value,
      address: this.adminForm.get('address')?.value,
      birthdate: this.adminForm.get('birthdate')?.value,
      email: this.adminForm.get('email')?.value,
      password: this.adminForm.get('identification')?.value,
      state: true,
    };

    if (this.userDataCopy.id) {
      this.userService
        .update(this.adminForm.value, this.userDataCopy.identification)
        .subscribe((res) => {
          this.onClose(true);
        });

      let pass = this.adminForm.get('password')?.value;
      if (pass > 0) {
        this.userService
          .updatePassword(
            { password: this.adminForm.get('password')?.value },
            this.adminForm.get('identification')?.value
          )
          .subscribe((res) => {});
      }
    } else {
      this.userService.create(data).subscribe((res) => {
        if (res.code > 1000) this.onClose(true);
      });
    }
  }

  private createForm() {
    this.adminForm = this.formBuilder.group({
      identification: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
      name: ['', [Validators.required]],
      lastname: [''],
      occupation: [''],
      city: ['', [Validators.required]],
      address: [''],
      birthdate: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.email, Validators.required]],
      rol: [{ value: 'Admin', disabled: true }],
      password: [''],
    });
  }

  private getFormattedYear(): string {
    const instant = moment(new Date()).add(-18, 'y');
    return instant.format('YYYY-MM-DD');
  }

  private patchValue() {
    this.adminForm.patchValue({
      identification: this.userDataCopy.identification,
      name: this.userDataCopy.name,
      lastname: this.userDataCopy.lastname,
      occupation: this.userDataCopy.occupation,
      city: this.userDataCopy.city,
      address: this.userDataCopy.address,
      birthdate: this.userDataCopy.birthdate,
      phone: this.userDataCopy.phone,
      email: this.userDataCopy.email,
      password: this.userDataCopy.password,
    });
  }
}
