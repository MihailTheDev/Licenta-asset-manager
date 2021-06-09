import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent, LayoutComponent } from './components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

const MATERIAL_MODULES: any[] = [
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
];

@NgModule({
  declarations: [BaseComponent, LayoutComponent],
  imports: [CommonModule, RouterModule, MATERIAL_MODULES],
})
export class CoreModule {}
