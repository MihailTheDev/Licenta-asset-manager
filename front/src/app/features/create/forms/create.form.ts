import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateFormGroup extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      date: new FormControl({ value: '', disabled: true }, [Validators.required]),
      serialNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl('', []),
      observation: new FormControl('', []),
      parentAssets: new FormControl('', []),
      childAssets: new FormControl('', []),
      group: new FormControl('', [Validators.required]),
    });
  }
}
