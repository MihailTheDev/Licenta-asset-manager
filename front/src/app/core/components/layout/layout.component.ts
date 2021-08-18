import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectService } from '@core/services/redirect.service';
import { SavedLinkService } from '@shared/services';

interface MenuItem {
  id: string;
  iconLabel: string;
  buttonLabel: string;
  redirectTo: string;
  ariaLabel: string;
  forAdminOnly?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public expandSideMenu: boolean = false;
  public isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
  public menuItems: MenuItem[] = [
    {
      id: '1',
      iconLabel: 'home',
      buttonLabel: 'Acasa',
      ariaLabel: 'Mergi acasa',
      redirectTo: '/home',
      forAdminOnly: false,
    },
    {
      id: '2',
      iconLabel: 'add',
      buttonLabel: 'Creeaza',
      ariaLabel: 'Creaza',
      redirectTo: '/create',
      forAdminOnly: true,
    },
    {
      id: '3',
      iconLabel: 'list',
      buttonLabel: 'Lista obiecte',
      ariaLabel: 'Vezi lista de obiecte',
      redirectTo: '/display',
      forAdminOnly: true,
    },
    {
      id: '4',
      iconLabel: 'assignment_returned',
      buttonLabel: 'Requesturi',
      ariaLabel: 'Vezi requesturi',
      redirectTo: '/assign',
      forAdminOnly: false,
    },
    {
      id: '5',
      iconLabel: 'assignment_late',
      buttonLabel: 'Tichete',
      redirectTo: '/ticket',
      ariaLabel: 'Vezi tichete',
      forAdminOnly: false,
    },
  ];

  public links: any[];

  constructor(
    private redirect: RedirectService,
    private router: Router,
    private savedLinksService: SavedLinkService,
  ) {}

  ngOnInit() {
    this.savedLinksService.getLinks().subscribe((res) => {
      this.links = res.savedLink ?? [];
    });
  }

  public toggle(): void {
    this.expandSideMenu = !this.expandSideMenu;
  }

  public onMenuItemClick(menuItem: any): void {
    this.router.navigate([menuItem.redirectTo]);
  }

  public logOut(): void {
    sessionStorage.clear();
    this.redirect.toLogin();
  }

  public redirectToView(savedLink: any): void {
    return this.redirect.toAssetQrView(savedLink.assetId);
  }
}
