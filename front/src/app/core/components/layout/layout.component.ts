import { Component, OnInit } from '@angular/core';

interface MenuItem {
  id: string;
  iconLabel: string;
  buttonLabel: string;
  redirectTo: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  expandSideMenu: boolean = false;
  menuItems: MenuItem[] = [
    {
      id: '1',
      iconLabel: 'home',
      buttonLabel: 'Home',
      redirectTo: '/home',
    },
    {
      id: '2',
      iconLabel: 'add',
      buttonLabel: 'Create',
      redirectTo: '/create',
    },
    {
      id: '3',
      iconLabel: 'list',
      buttonLabel: 'List',
      redirectTo: '/list',
    },
  ];
  constructor() {}

  ngOnInit() {}

  public toogle(): void {
    this.expandSideMenu = !this.expandSideMenu;
  }

  public onMenuItemClick(item: any): void {
    console.log(item);
  }
}
