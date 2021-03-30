import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components';
import { RedirectService } from '@core/services/redirect.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RegisterFormGroup } from '../../forms';
import { RegisterModel } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  public form = new RegisterFormGroup();
  public isFormValid: boolean = false;

  constructor(private redirect: RedirectService) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.form.statusChanges
      .pipe(
        distinctUntilChanged(),
        map((status) => (status === 'VALID' ? true : false)),
      )
      .subscribe((status) => {
        this.isFormValid = status;
      });
  }

  onRedirect() {
    this.redirect.toRegister();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onReset() {
    this.form.reset();
    this.form.updateValueAndValidity();
  }

  public get formValue(): RegisterModel {
    return this.form.value;
  }
}
