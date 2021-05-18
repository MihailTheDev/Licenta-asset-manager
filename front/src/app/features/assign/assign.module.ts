import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AssignRoutingModule } from './assign-routing.module';
import { AssignComponent } from './pages';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
const MATERIAL_MODULES: any[] = [MatSelectModule];
@NgModule({
  imports: [AssignRoutingModule, CommonModule, MATERIAL_MODULES, ReactiveFormsModule, SharedModule],
  declarations: [AssignComponent],
  providers: [AssignModule],
})
export class AssignModule {}
