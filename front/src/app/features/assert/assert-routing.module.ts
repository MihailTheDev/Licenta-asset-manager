import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyAdminGuard } from '@core/guards/auth.guard';
import { AssertComponent } from './pages';

const routes: Routes = [
  { path: ':id', component: AssertComponent },

  {
    path: '',
    canActivate: [OnlyAdminGuard],
    pathMatch: 'full',
    component: AssertComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssertRoutingModule {}
