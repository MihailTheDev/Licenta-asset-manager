import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectService } from '@core/services/redirect.service';

interface MenuItem {
  id: string;
  iconLabel: string;
  buttonLabel: string;
  redirectTo: string;
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
      redirectTo: '/home',
      forAdminOnly: false,
    },
    {
      id: '2',
      iconLabel: 'add',
      buttonLabel: 'Creeaza',
      redirectTo: '/create',
      forAdminOnly: false,
    },
    {
      id: '3',
      iconLabel: 'list',
      buttonLabel: 'Lista obiecte',
      redirectTo: '/display',
      forAdminOnly: true,
    },
    {
      id: '4',
      iconLabel: 'assignment_returned',
      buttonLabel: 'Requesturi',
      redirectTo: '/assign',
      forAdminOnly: false,
    },
    {
      id: '5',
      iconLabel: 'assignment_late',
      buttonLabel: 'Tichete',
      redirectTo: '/ticket',
      forAdminOnly: false,
    },
  ];
  constructor(private redirect: RedirectService, private router: Router) {}

  ngOnInit() {
    console.log(this.isAdmin);
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
}
