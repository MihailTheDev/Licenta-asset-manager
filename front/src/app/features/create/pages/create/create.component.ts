import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@core/components';
import { GROUP_ID_TYPES, OPTIONS } from '../../constants';
import { CreateFormGroup } from '../../forms/create.form';
import { CreateDialogService } from '../../services/create-dialog.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  public form: FormGroup = new CreateFormGroup();
  constructor(private dialogService: CreateDialogService, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  openPopUp(): void {
    // this.dialogService.open(this.dialog);
  }

  get OPTIONS() {
    return OPTIONS;
  }

  get GroupIdTypes() {
    return GROUP_ID_TYPES;
  }

  get groupValue(): string {
    return this.form.value.group;
  }

  get serialNumberControl(): FormControl {
    return this.form.controls.serialNumber as FormControl;
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }

  public onReset(): void {
    this.form.reset();
  }

  public onSerialNumberSliderChange({ checked }: any): void {
    if (checked) {
      this.serialNumberControl.disable();
    }
    this.serialNumberControl.enable();
  }
}
