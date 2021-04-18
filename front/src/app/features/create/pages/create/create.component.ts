import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@core/components';
import { distinctUntilChanged } from 'rxjs/operators';
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
  public parentAssets: any[] = [];
  public childAssets: any[] = [];
  public displayedColumns: string[] = ['name', 'group', 'serialNumber'];
  public sliderSerialNumberControl = new FormControl('');
  public linkedAssetsError = false;

  constructor(private dialogService: CreateDialogService, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.serialNumberSliderChange();
  }

  public openParentPopUp(): void {
    this.subscription$ = this.dialogService
      .open(this.dialog, this.parentAssets)
      .subscribe((selectedItems) => {
        this.parentAssets = selectedItems;
        this.checkLinkedAssets();
      });
  }

  public openChildPopUp(): void {
    this.subscription$ = this.dialogService
      .open(this.dialog, this.childAssets)
      .subscribe((selectedItems) => {
        this.childAssets = selectedItems;
        this.checkLinkedAssets();
      });
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

  private serialNumberSliderChange(): void {
    this.sliderSerialNumberControl.valueChanges
      .pipe(distinctUntilChanged((a, b) => a === b))
      .subscribe((value) => {
        if (value) {
          this.serialNumberControl.enable();
          return;
        }
        this.serialNumberControl.disable();
      });
  }

  private checkLinkedAssets(): void {
    this.linkedAssetsError = this.parentAssets
      .map((asset) => asset.id)
      .some((parentId) => this.childAssets.map((asset) => asset.id).includes(parentId));
  }
}
