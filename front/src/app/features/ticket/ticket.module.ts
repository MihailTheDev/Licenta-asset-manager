import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TicketComponent } from './pages';
import { TicketRoutingModule } from './ticket-routing.module';

const MATERIAL_MODULES = [
  MatGridListModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatButtonModule,
  MatCardModule,
];

@NgModule({
  imports: [CommonModule, MATERIAL_MODULES, TicketRoutingModule],
  declarations: [TicketComponent],
})
export class TicketModule {}
