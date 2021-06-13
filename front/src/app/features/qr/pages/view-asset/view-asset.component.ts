import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssetService, AssignService, TicketService } from '@shared/services';
import { SavedLinkService } from '../../../../shared/services';
import { CreateTicketComponent, LoginComponent } from '../../dialogs';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss'],
})
export class ViewAssetComponent implements OnInit {
  public assetName: string;
  public serialNumber: string;

  private assetId: string;
  private username: string;
  constructor(
    private assetService: AssetService,
    private assignService: AssignService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private savedLinkService: SavedLinkService,
    private ticketService: TicketService,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!params['id']) {
        return;
      }

      this.assetId = params['id'];
      this.getObjectData(this.assetId);
    });
  }

  public saveLink(): void {
    this.savedLinkService.saveLink(this.assetId, this.assetName);
  }

  public createTicket(): void {
    this.username = sessionStorage.getItem('username') as string;
    if (!this.username) {
      this.login();
      return;
    }

    this.matDialog
      .open(CreateTicketComponent, { height: '400px', width: '300px' })
      .afterClosed()
      .subscribe((ticketText) => {
        this.ticketService.createTicket({
          user: this.username,
          assetId: this.assetId,
          description: ticketText,
        });
      });
  }

  public requestObject(): void {
    this.username = sessionStorage.getItem('username') as string;
    if (!this.username) {
      this.login();
      return;
    }

    this.assetService.createAsset({ user: this.username, assetId: this.assetId });
  }

  private getObjectData(assetId: string): void {
    this.assetService.getAssetById(assetId).subscribe((asset) => {
      this.assetName = asset.name;
      this.serialNumber = asset.serialNumber;
    });
  }

  private login(): void {
    this.username = sessionStorage.getItem('username') as string;

    this.matDialog
      .open(LoginComponent, { height: '400px', width: '300px' })
      .afterClosed()
      .subscribe((_) => {
        this.username = sessionStorage.getItem('username') as string;
      });
  }
}
