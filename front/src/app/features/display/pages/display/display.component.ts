import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AssetService } from '@shared/services';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  public assets: any[] = [];
  public countTotalElements: number = 0;
  public pageSize = 15;
  public displayedColumns: string[] = [
    'name',
    'group',
    'size',
    'yearOfProduct',
    'group',
    'goToDetailsButton',
    'deleteButton',
  ];

  constructor(private assetService: AssetService, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.assetService
      .getAssets(1, this.pageSize)
      .pipe(take(1))
      .subscribe((response) => {
        this.assets = response.assets;
        this.countTotalElements = response.count;
      });
  }

  public onDetailsClick(asset: any): void {
    console.log('asset click');
    console.log(asset);
  }

  public onPageIndexChange(paginator: PageEvent): void {
    console.log(paginator);

    this.assetService
      .getAssets(paginator.pageIndex + 1, paginator.pageSize)
      .pipe(take(1))
      .subscribe((response) => {
        this.assets = response.assets;
        this.cd.detectChanges();
      });
  }
}
