import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AssignComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignRoutingModule {}
