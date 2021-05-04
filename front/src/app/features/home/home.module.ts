import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './pages';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES: any[] = [MatCardModule, MatButtonModule];
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, MATERIAL_MODULES],
})
export class HomeModule {}
