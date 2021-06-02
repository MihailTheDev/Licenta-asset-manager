import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/components';
import { AssetService } from '@shared/services';
import * as moment from 'moment';
import { of } from 'rxjs';
import { distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { GROUP_ID_TYPES, OPTIONS } from '../../constants';
import { CreateFormGroup } from '../../forms/assert.form';
import { CreateDialogService } from '../../services/assert-dialog.service';

enum StateOfPage {
  CREATE,
  EDIT,
  VIEW,
}

@Component({
  templateUrl: './assert.component.html',
  styleUrls: ['./assert.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class AssertComponent extends BaseComponent implements OnInit {
  public form: FormGroup = new CreateFormGroup();
  public parent: any[] = [];
  public children: any[] = [];
  public displayedColumns: string[] = ['name', 'group', 'serialNumber'];
  public sliderSerialNumberControl = new FormControl('');
  public linkedAssetsError = false;
  public stateOfPage: StateOfPage = StateOfPage.CREATE;
  public assetId: string;
  public isAdmin: boolean;

  public get stateOfPageType(): typeof StateOfPage {
    return StateOfPage;
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

  constructor(
    private dialogService: CreateDialogService,
    private dialog: MatDialog,
    private assetService: AssetService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    console.log(this.isAdmin);

    this.serialNumberSliderChange();

    this.route.params.subscribe((params) => {
      if (!params['id']) {
        return;
      }
      this.assetId = params['id'];
      this.disableFormEditing();
      this.populateForm();
    });
  }

  private populateForm(): void {
    this.stateOfPage = StateOfPage.VIEW;
    this.assetService
      .getAssetById(this.assetId)
      .pipe(
        take(1),
        switchMap((response: any) => {
          this.assetId = response._id;
          response.yearOfProduct = moment(response.yearOfProduct);
          this.form.patchValue(response);

          response.children.forEach((childId: any) => {
            this.assetService
              .getAssetById(childId)
              .pipe(take(1))
              .subscribe((response) => {
                this.children.push(response);
              });
          });
          if (!response.parent) {
            return of(undefined);
          }
          return this.assetService.getAssetById(response.parent);
        }),
      )
      .subscribe((response) => {
        if (!response) {
          this.parent = [];
        } else {
          this.parent = [response];
        }
        this.form.parent?.setValue(response);
      });
  }

  public enableFormEditing(): void {
    this.stateOfPage = StateOfPage.EDIT;
    this.form.enable();
  }
  public disableFormEditing(): void {
    this.stateOfPage = StateOfPage.VIEW;
    this.form.disable();
  }

  public openParentPopUp(): void {
    this.subscription$ = this.dialogService
      .open(this.dialog, this.parent, false)
      .subscribe((selectedItems: any) => {
        this.form.controls.parent.patchValue(selectedItems[0]._id);

        this.parent = selectedItems;
        console.log(this.parent);

        this.checkLinkedAssets();
      });
  }

  public openChildPopUp(): void {
    this.subscription$ = this.dialogService
      .open(this.dialog, this.children, true)
      .subscribe((selectedItems: any) => {
        this.form.controls.children.patchValue(selectedItems.map((item: any) => item._id));
        console.log(this.form.controls.children.value);

        this.children = selectedItems;
        this.checkLinkedAssets();
      });
  }

  public onSubmit(): void {
    this.assetService.createAsset(this.form.value).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  public onUpdate(): void {
    this.assetService.updateAsset(this.form.value, this.assetId).subscribe((response) => {
      console.log(response);
      this.populateForm();
    });
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
