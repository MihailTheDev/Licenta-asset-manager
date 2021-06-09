import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '@shared/services';
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
    private route: ActivatedRoute,
    private assetService: AssetService,
    private savedLinkService: SavedLinkService,
    private matDialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!params['id']) {
        return;
      }

      this.assetId = params['id'];
      this.getObjectData(this.assetId);
    });

    this.savedLinkService.getLinks().subscribe((res) => {
      console.log(res);
    });
  }

  public saveLink(): void {
    this.savedLinkService.saveLink(this.assetId, this.assetName).subscribe((res) => {
      console.log(res);
    });
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
        console.log(ticketText);
      });

    // open create ticket
  }

  public requestObject(): void {
    this.username = sessionStorage.getItem('username') as string;
    if (!this.username) {
      this.login();
      return;
    }
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
