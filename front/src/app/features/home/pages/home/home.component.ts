import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeDialogService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isAdmin: boolean = false;
  public username: string;
  constructor(private dialogService: HomeDialogService, private matDialog: MatDialog) {}

  public ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;
  }

  public createRequest(): void {
    this.dialogService.openRequest(this.matDialog, [], false);
  }
}
