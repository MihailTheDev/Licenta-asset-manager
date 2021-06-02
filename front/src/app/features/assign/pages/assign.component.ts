import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { RedirectService } from '@core/services/redirect.service';
import { AssignService } from '@shared/services/assign.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss'],
})
export class AssignComponent implements OnInit {
  public isAdmin: boolean;
  public username: string;

  public assigns: any[] = [];
  public countTotalElements: number = 0;
  public pageSize = 15;
  public pageNumber = 1;
  public displayedColumns: string[] = [
    'name',
    'yearOfProduct',
    'user',
    'createDate',
    'assignDate',
    'returnDate',
    'status',
  ];
  public status: string | undefined;

  constructor(private assignService: AssignService, private redirectService: RedirectService) {}

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;

    if (this.isAdmin) {
      this.displayedColumns.push('updateButton', 'goToDetailsButton');
    } else {
      this.displayedColumns.push('goToDetailsButton');
    }
    this.populateTable();
  }

  public onSelectChange(event: any): void {
    if (event.value === 'created') {
      this.status = '0';
    } else if (event.value === 'assigned') {
      this.status = '1';
    } else if (event.value === 'returned') {
      this.status = '2';
    } else {
      this.status = undefined;
    }
    console.log(event, this.status);

    this.populateTable();
  }
  public onElementUpdate(element: any): void {
    this.assignService
      .updateStatus(element._id, element.status === 'Created' ? '1' : '2')
      .subscribe((_) => {
        this.populateTable();
      });
  }

  public onPaginatorChange(paginator: PageEvent): void {
    this.pageNumber = paginator.pageIndex + 1;
    this.populateTable();
  }

  public onDetailsClick(event: any): void {
    this.redirectService.toEditAsset(event.assetId);
  }

  private populateTable(): void {
    if (this.isAdmin) {
      this.assignService
        .getAdminAssigns(this.pageSize, this.pageNumber, this.status)
        .pipe(
          take(1),
          map((response) => {
            this.handleAssign(response.assigns);
            return response;
          }),
        )
        .subscribe((response) => {
          this.assigns = response.assigns;
          this.countTotalElements = response.count;
        });
    } else {
      this.assignService
        .getUserAssigns(this.username, this.pageSize, this.pageNumber, this.status)
        .pipe(
          take(1),
          map((response) => {
            this.handleAssign(response.assigns);
            return response;
          }),
        )
        .subscribe((response) => {
          this.assigns = response.assigns;
          this.countTotalElements = response.count;
        });
    }
  }

  private handleAssign(assigns: any[]): void {
    assigns.map((assign: any) => {
      assign.createDate = new Date(assign.createDate).toDateString();

      if (!assign.assignDate) {
        assign.assignDate = '-';
      } else {
        assign.assignDate = new Date(assign.createDate).toDateString();
      }

      if (!assign.returnDate) {
        assign.returnDate = '-';
      } else {
        assign.createDate = new Date(assign.createDate).toDateString();
      }

      assign.status = this.convertStatus(assign.status);
      return assign;
    });
  }

  private convertStatus(status: string) {
    if (status === '0') {
      return 'Created';
    }
    if (status === '1') {
      return 'Assigned';
    }

    return 'Returned';
  }
}
