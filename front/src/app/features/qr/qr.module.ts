import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrRoutingModule } from './qr-routing.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrComponent } from './pages/qr/qr.component';

@NgModule({
  declarations: [QrComponent],
  imports: [CommonModule, QrRoutingModule, NgxQRCodeModule],
})
export class QrModule {}
