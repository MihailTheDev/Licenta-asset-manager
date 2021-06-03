import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@core/components';
import { AuthGuard, OnlyAdminGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'qr',
    loadChildren: () => import('./features/qr/qr.module').then((m) => m.QrModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        canActivate: [OnlyAdminGuard],
        loadChildren: () => import('./features/assert/assert.module').then((m) => m.AssertModule),
      },
      {
        path: 'edit',
        loadChildren: () => import('./features/assert/assert.module').then((m) => m.AssertModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'display',
        canActivate: [OnlyAdminGuard],
        loadChildren: () =>
          import('./features/display/display.module').then((m) => m.DisplayModule),
      },
      {
        path: 'assign',
        loadChildren: () => import('./features/assign/assign.module').then((m) => m.AssignModule),
      },
      {
        path: 'ticket',
        loadChildren: () => import('./features/ticket/ticket.module').then((m) => m.TicketModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
