import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './pages';
import { SharedModule } from '@shared/shared.module';

const MATERIAL_MODULES: any[] = [];

@NgModule({
  declarations: [DisplayComponent],
  imports: [CommonModule, DisplayRoutingModule, MATERIAL_MODULES, SharedModule],
})
export class DisplayModule {}
