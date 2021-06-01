import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateFormGroup extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      yearOfProduct: new FormControl('', [Validators.required]),
      serialNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl('', []),
      observation: new FormControl('', []),
      parent: new FormControl('', []),
      children: new FormControl('', []),
      group: new FormControl('', [Validators.required]),
    });
  }

  // constructor() {
  //   super({
  //     name: new FormControl(''),
  //     size: new FormControl(''),
  //     yearOfProduct: new FormControl(''),
  //     date: new FormControl({ value: '', disabled: true }),
  //     serialNumber: new FormControl({ value: '', disabled: true }),
  //     description: new FormControl('', []),
  //     observation: new FormControl('', []),
  //     parent: new FormControl('', []),
  //     children: new FormControl([], []),
  //     group: new FormControl(''),
  //   });
  // }
}
