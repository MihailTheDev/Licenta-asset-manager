import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginFormGroup extends FormGroup {
  constructor() {
    super({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
}

export class RegisterFormGroup extends FormGroup {
  constructor() {
    super({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
