import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@core/components';
import { RedirectService } from '@core/services/redirect.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RegisterFormGroup } from '../../forms';
import { RegisterModel } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  public form = new RegisterFormGroup();
  public isFormValid: boolean = false;
  public requestError: boolean = false;

  constructor(
    private authService: AuthService,
    private redirect: RedirectService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscription$ = this.form.statusChanges
      .pipe(
        distinctUntilChanged(),
        map((status) => (status === 'VALID' ? true : false)),
      )
      .subscribe((status) => {
        this.isFormValid = status;
      });
  }

  onRedirect() {
    this.redirect.toLogin();
  }

  onSubmit() {
    this.authService.register(this.form.value).subscribe(
      (_) => {
        this.snackBar.open(
          'Inregistrarea a fost cu succes! Va puteti loga in aplicatie.',
          undefined,
          { duration: 1000 },
        );
        this.requestError = false;
        this.redirect.toLogin();
      },
      (_) => {
        this.snackBar.open(
          'Inregistrarea nu a functionat. Verificati daca aveti un username unic, apoi mai incercati o data.',
          undefined,
          { duration: 3000 },
        );
        this.requestError = true;
      },
    );
  }

  onReset() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  public get formValue(): RegisterModel {
    return this.form.value;
  }
}
