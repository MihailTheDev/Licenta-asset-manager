import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AssignRoutingModule } from './assign-routing.module';
import { AssignComponent } from './pages';

@NgModule({
  imports: [AssignRoutingModule, CommonModule, SharedModule],
  declarations: [AssignComponent],
  providers: [AssignModule],
})
export class AssignModule {}
