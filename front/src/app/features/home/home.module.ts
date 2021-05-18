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

const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatStepperModule,
  MatTooltipModule,

  MatListModule,
];
@NgModule({
  declarations: [HomeComponent, DialogCreateRequestComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, MATERIAL_MODULES],
})
export class HomeModule {}
