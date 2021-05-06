import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@core/components';
import { RedirectService } from '@core/services/redirect.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LoginFormGroup } from '../../forms';
import { LoginModel } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public form: FormGroup = new LoginFormGroup();
  public isFormValid = false;
  public requestError = false;

  constructor(
    private auth: AuthService,
    private redirect: RedirectService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.subscription$ = this.form.statusChanges
      .pipe(
        distinctUntilChanged(),
        map((status) => (status === 'VALID' ? true : false)),
      )
      .subscribe((status) => {
        this.isFormValid = status;
      });
  }

  public onRedirect(): void {
    this.redirect.toRegister();
  }

  public onSubmit(): void {
    this.auth.login(this.formValue).subscribe(
      (response) => {
        console.log(response);

        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('role', 'admin');
        sessionStorage.setItem('username', response.user);
        this.snackBar.open('Logarea a fost realizata cu succes', undefined, { duration: 1000 });
        this.redirect.toHome();
      },
      (_) => {
        this.snackBar.open(
          'Logarea nu a putut fi realizata. Va rog sa verificati credetialele si apoi sa reincercati logarea.',
          undefined,
          { duration: 3000 },
        );
      },
    );
  }

  public onReset(): void {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  public get formValue(): LoginModel {
    return this.form.value;
  }
}
