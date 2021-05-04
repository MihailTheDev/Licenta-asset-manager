import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './pages';

const MATERIAL_MODULES: any[] = [];

@NgModule({
  declarations: [DisplayComponent],
  imports: [DisplayRoutingModule, MATERIAL_MODULES, CommonModule],
})
export class DisplayModule {}
