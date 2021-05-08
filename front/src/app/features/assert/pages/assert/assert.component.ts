import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@core/components';
import { AssetService } from '@shared/services';
import { distinctUntilChanged } from 'rxjs/operators';
import { GROUP_ID_TYPES, OPTIONS } from '../../constants';
import { CreateFormGroup } from '../../forms/assert.form';
import { CreateDialogService } from '../../services/assert-dialog.service';
@Component({
  templateUrl: './assert.component.html',
  styleUrls: ['./assert.component.scss'],
})
export class AssertComponent extends BaseComponent implements OnInit {
  public form: FormGroup = new CreateFormGroup();
  public parent: any[] = [];
  public children: any[] = [];
  public displayedColumns: string[] = ['name', 'group', 'serialNumber'];
  public sliderSerialNumberControl = new FormControl('');
  public linkedAssetsError = false;

  constructor(
    private dialogService: CreateDialogService,
    private dialog: MatDialog,
    private assetService: AssetService,
  ) {
    super();
  }

  ngOnInit() {
    this.serialNumberSliderChange();
    this.form.disable();
  }

  public openParentPopUp(): void {
    this.subscription$ = this.dialogService
      .open(this.dialog, this.parent, false)
      .subscribe((selectedItems: any) => {
        this.form.controls.parent.setValue(selectedItems[0]._id);

        this.parent = selectedItems;
        this.checkLinkedAssets();
      });
  }

  public openChildPopUp(): void {
    this.subscription$ = this.dialogService
      .open(this.dialog, this.children, true)
      .subscribe((selectedItems: any) => {
        this.form.controls.children.setValue(selectedItems.map((item: any) => item._id));
        this.children = selectedItems;
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
    const asset = this.form.value;
    console.log(asset.parent);
    console.log(asset.children);

    this.assetService.createAsset(this.form.value).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      },
    );
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
    this.linkedAssetsError = this.parent
      .map((asset) => asset._id)
      .some((parentId) => this.children.map((asset) => asset._id).includes(parentId));
  }
}
