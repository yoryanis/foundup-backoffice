import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { CITY, OCCUPATION } from 'src/app/entities/enum';
import { DATE_FORMAT } from '../../../utils/moment-format.util';
import { AuthService, GlobalService, UserService } from 'src/app/services';
import { User } from 'src/app/entities';
import { MustMatch } from '../../../utils/match-password.util';
import { delay, first } from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
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
export class ProfileEditComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public cities = CITY;
  public maxDate!: string;
  public occupations = OCCUPATION;
  public passwordForm!: FormGroup;
  public profileForm!: FormGroup;
  public user!: User;
  public userInfo!: User;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly userService: UserService
  ) {
    this.blockUI.start('Cargando...');
    this.createForm();
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.maxDate = this.getFormattedYear();

    this.getUserInfo(this.userInfo);
  }

  get f() {
    return this.profileForm.controls;
  }

  get g() {
    return this.passwordForm.controls;
  }

  public onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.userService
      .update(this.profileForm.value, this.userInfo.identification)
      .subscribe(
        (res) => {
          this.globalService.onSuccess(res.message, res.code);
        },
        (err) => this.globalService.onFailure(err.error.error, err.error.code)
      );
  }

  public onSubmitPassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    if (this.passwordForm.valid) {
      this.userService
        .updatePassword(
          { password: this.passwordForm.get('password')?.value },
          this.userInfo.identification
        )
        .subscribe(
          (res) => {
            this.globalService.onSuccess(res.message, res.code);
          },
          (err) => this.globalService.onFailure(err.error.error, err.error.code)
        );
    }
  }

  private createForm() {
    this.profileForm = this.formBuilder.group({
      identification: [{ value: '', disabled: true }],
      name: ['', [Validators.required]],
      lastname: [''],
      occupation: [''],
      city: ['', [Validators.required]],
      address: [''],
      birthdate: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.email, Validators.required]],
    });
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  private getFormattedYear(): string {
    const instant = moment(new Date()).add(-18, 'y');
    return instant.format('YYYY-MM-DD');
  }

  private getUserInfo(user: User) {
    this.userService
      .getById(user)
      .pipe(first())
      .pipe(delay(100))
      .subscribe((res) => {
        this.user = res.data;
        this.patchValue(res.data);
        this.blockUI.stop();
      });
  }

  private patchValue(data: any) {
    this.profileForm.patchValue({
      identification: data.identification,
      name: data.name,
      lastname: data.lastname,
      city: data.city,
      address: data.address,
      birthdate: data.birthdate,
      occupation: data.occupation,
      phone: data.phone,
      email: data.email,
    });
  }
}
