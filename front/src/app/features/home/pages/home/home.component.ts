import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RedirectService } from '@core/services/redirect.service';
import { HomeDialogService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isAdmin: boolean = false;
  public username: string;
  constructor(
    private dialogService: HomeDialogService,
    private matDialog: MatDialog,
    private redirectService: RedirectService,
  ) {}

  public ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;
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
