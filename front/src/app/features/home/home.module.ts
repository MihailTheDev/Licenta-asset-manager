import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { DialogCreateRequestComponent } from './dialogs/dialog-create-request/dialog-create-request.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages';
import { MatListModule } from '@angular/material/list';
import { DialogCreateTicketComponent } from './dialogs/dialog-create-ticket/dialog-create-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatStepperModule,
  MatTooltipModule,
  MatInputModule,
  MatListModule,
  MatFormFieldModule,
];
@NgModule({
  declarations: [HomeComponent, DialogCreateRequestComponent, DialogCreateTicketComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, MATERIAL_MODULES, ReactiveFormsModule],
})
export class HomeModule {}
