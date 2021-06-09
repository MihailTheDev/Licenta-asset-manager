import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrRoutingModule } from './qr-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrComponent } from './pages/qr/qr.component';
import { ViewAssetComponent } from './pages';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateTicketComponent, LoginComponent } from './dialogs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QrComponent, ViewAssetComponent, LoginComponent, CreateTicketComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    NgxQRCodeModule,
    QrRoutingModule,
    ReactiveFormsModule,
  ],
})
export class QrModule {}
