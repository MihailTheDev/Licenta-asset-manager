import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OPTIONS } from '../../constants';

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

  public selectedItems: any[] = [];

  ngOnInit() {}

  onSelectItem(items: any[]) {
    this.selectedItems = items;
  }

  submit(): void {
    console.log('submit');
  }

  cancel(): void {
    console.log('cancel');
  }

  get OPTIONS() {
    return OPTIONS;
  }
}
