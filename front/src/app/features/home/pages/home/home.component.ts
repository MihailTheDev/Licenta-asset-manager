import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RedirectService } from '@core/services/redirect.service';
import { AssetService, StatisticsService } from '@shared/services';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HomeDialogService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isAdmin: boolean = false;
  public username: string;
  public tickets$: Observable<any>;
  public assigns$: Observable<any>;
  public objectsCount: number = 0;
  public assignDate: any;
  public objectName: string;

  constructor(
    private dialogService: HomeDialogService,
    private matDialog: MatDialog,
    private redirectService: RedirectService,
    private staticsService: StatisticsService,
    private assetService: AssetService,
  ) {}

  public ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;

    this.tickets$ = this.staticsService.getTickets(this.username);
    this.assigns$ = this.staticsService.getAssigns(this.username);

    this.staticsService.getObjects(this.username).subscribe((result) => {
      console.log(result);

      this.objectsCount = result.count;
      this.assignDate = moment(result.assignDate).format('DD MM YYYY');
      // this.assetService.getAssetById(result.assign.assetId).subscribe((asset) => {
      //   this.objectName = asset;
      // });
    });
  }

  public createRequest(): void {
    this.dialogService.openRequest(this.matDialog, [], false);
  }

  public createTicket(): void {
    this.dialogService.openTicket(this.matDialog, [], false);
  }

  public goToTickets(): void {
    this.redirectService.toTickets();
  }
}
