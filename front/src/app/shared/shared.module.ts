import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

const MATERIAL_MODULES = [MatTableModule, MatCheckboxModule, MatPaginatorModule];

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MATERIAL_MODULES],
  exports: [TableComponent],
})
export class SharedModule {}
