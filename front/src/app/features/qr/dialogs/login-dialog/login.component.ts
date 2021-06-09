import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@core/components';
import { AuthService } from 'app/features/auth/services/auth.service';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public isFormValid = false;
  public requestError = false;

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
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

  public onSubmit(): void {
    this.auth.login(this.formValue).subscribe((response: any) => {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('role', response.role);
      sessionStorage.setItem('username', response.user);
      this.dialogRef.close();
    });
  }

  public onReset(): void {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  public get formValue(): any {
    return this.form.value;
  }
}
