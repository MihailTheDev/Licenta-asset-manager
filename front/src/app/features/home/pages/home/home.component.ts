import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isAdmin: boolean = false;
  public username: string;
  constructor() { }

  ngOnInit() {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;
  }

}
