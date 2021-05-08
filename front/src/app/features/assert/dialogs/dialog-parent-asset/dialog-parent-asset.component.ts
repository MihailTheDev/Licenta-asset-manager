import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AssetService } from '@shared/services';
import { OPTIONS } from '../../constants';
import { ModalAssetItem } from '../../models';

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
  public dataSource: any[];
  public showOnlySelected = false;
  public pageSize = 7;
  public pageNumber = 1;
  public assetsCount: number;
  public selectedItems: any[] = [];
  public displayedColumns: string[] = ['name', 'group', 'serialNumber'];

  constructor(
    private assetService: AssetService,
    public dialogRef: MatDialogRef<DialogParentAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedItems: any; multipleSelect: boolean },
  ) {}

  public ngOnInit(): void {
    this.populateTable();
  }

  public onSelectItem(items: any[]): void {
    console.log('selection change');

    this.selectedItems = items;
  }

  public submit(): void {
    this.dialogRef.close(this.selectedItems);
  }

  public cancel(): void {
    this.dialogRef.close(this.selectedItems);
  }

  public onPaginatorChange(pageChange: PageEvent): void {
    this.pageNumber = pageChange.pageIndex + 1;
    this.populateTable();
  }

  private populateTable(): void {
    this.assetService.getAssets(this.pageNumber, this.pageSize).subscribe((result) => {
      this.dataSource = result.assets;
      this.assetsCount = result.count;
    });
  }

  public get OPTIONS() {
    return OPTIONS;
  }

  public get showSelected(): boolean {
    return this.showSelectedControl.value;
  }
}
