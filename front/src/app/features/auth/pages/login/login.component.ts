import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@core/components';
import { RedirectService } from '@core/services/redirect.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LoginFormGroup } from '../../forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public form: FormGroup = new LoginFormGroup();
  public isFormValid: boolean = false;

  constructor(private redirect: RedirectService) {
    super();
  }

  ngOnInit() {
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
}
