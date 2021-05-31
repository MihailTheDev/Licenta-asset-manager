import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TicketService } from '@shared/services';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  public isAdmin: boolean;
  public username: string;
  public pageSize = 20;
  public pageNumber = 1;
  public totalItems = 0;
  public filterByStatus = false;
  public tickets: any[] = [];
  constructor(private ticketService: TicketService) {}

  public ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'admin' ? true : false;
    this.username = sessionStorage.getItem('username') as string;
    this.populateList();
  }

  public pageChange(paginator: PageEvent): void {
    this.pageNumber = paginator.pageIndex + 1;
    this.populateList();
  }

  public onSliderChange($event: any): void {
    this.filterByStatus = !this.filterByStatus;
    this.populateList();
  }

  private populateList(): void {
    if (this.isAdmin) {
      this.ticketService
        .getAdminTickets(
          this.pageSize,
          this.pageNumber,
          this.filterByStatus === true ? '0' : undefined,
        )
        .subscribe((response) => {
          this.totalItems = response.count;
          this.tickets = response.tickets;
        });
    } else {
      this.ticketService
        .getUserTicket(
          this.username,
          this.pageSize,
          this.pageNumber,
          this.filterByStatus === true ? '0' : undefined,
        )
        .subscribe((response) => {
          this.totalItems = response.count;
          this.tickets = response.tickets;
        });
    }
  }
}
