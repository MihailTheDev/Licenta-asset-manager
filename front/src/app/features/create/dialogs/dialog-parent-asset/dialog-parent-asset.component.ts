import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OPTIONS } from '../../constants';
import { ModalAssetItem } from '../../models';

const ELEMENT_DATA: ModalAssetItem[] = [
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
];

@Component({
  selector: 'app-dialog-parent-asset',
  templateUrl: './dialog-parent-asset.component.html',
  styleUrls: ['./dialog-parent-asset.component.scss'],
})
export class DialogParentAssetComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    group: new FormControl(''),
    serialNumber: new FormControl(''),
  });
  showSelectedControl = new FormControl('');
  public dataSource = ELEMENT_DATA;
  public showOnlySelected = false;
  public selectedItems: any[] = [];
  public displayedColumns: string[] = ['name', 'group', 'serialNumber'];

  constructor(
    public dialogRef: MatDialogRef<DialogParentAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedItems: any },
  ) {}

  ngOnInit() {}

  onSelectItem(items: any[]) {
    this.selectedItems = items;
  }

  submit(): void {
    this.dialogRef.close(this.selectedItems);
  }

  cancel(): void {
    this.dialogRef.close(this.selectedItems);
  }

  get OPTIONS() {
    return OPTIONS;
  }

  get showSelected(): boolean {
    return this.showSelectedControl.value;
  }
}
