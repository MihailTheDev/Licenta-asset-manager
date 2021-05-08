import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssertComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AssertComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssertRoutingModule {}
