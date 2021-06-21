import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay, first } from 'rxjs/operators';

import { AuthService, GlobalService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loading = false;
  public loginForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this._snackBar.open(
      'Es un placer tenerte por aquí nuevamente.',
      'Keep up the good work!',
      {
        duration: 5000,
      }
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.loginForm.value)
      .subscribe(
        () => {
          this.router.navigateByUrl('/home/reports');
          this.loading = false;
        },
        (err) => {
          this.globalService.onFailure(err.error.error, err.error.code);
          this.loading = false;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
