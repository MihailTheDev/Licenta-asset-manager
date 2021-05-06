import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
];

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MATERIAL_MODULES],
  exports: [TableComponent],
})
export class SharedModule {}
