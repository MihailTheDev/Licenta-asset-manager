import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { AssetService } from '@shared/services';
import { AssignService } from '@shared/services/assign.service';

@Component({
  selector: 'app-dialog-create-request',
  templateUrl: './dialog-create-request.component.html',
  styleUrls: ['./dialog-create-request.component.scss'],
})
export class DialogCreateRequestComponent implements OnInit {
  public dataSource: any[];
  public pageSize = 6;
  public pageNumber = 1;
  public assetsCount: number;
  public selectedItem: any;
  public displayedColumns: string[] = ['name', 'group', 'serialNumber'];

  private username = sessionStorage.getItem('username') as string;

  constructor(
    private assetService: AssetService,
    private assignService: AssignService,
    public dialogRef: MatDialogRef<DialogCreateRequestComponent>,
  ) {}

  ngOnInit() {
    this.populateTable();
  }

  public onSelectItem(items: any[]): void {
    this.selectedItem = items[0];
    console.log(this.selectedItem);
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

  public getStepControl(): AbstractControl {
    return new FormControl(this.selectedItem, [Validators.required]);
  }

  public create(stepper: MatHorizontalStepper): void {
    this.assignService
      .createAssign({ assetId: this.selectedItem._id, user: this.username })
      .subscribe((value) => {
        console.log(value);
        stepper.next();
      });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
