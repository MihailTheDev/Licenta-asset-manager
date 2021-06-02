import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssetComponent } from './pages';
import { QrComponent } from './pages/qr/qr.component';

const routes: Routes = [
  { path: ':id', pathMatch: 'full', component: QrComponent },
  {
    path: 'view/:id',
    component: ViewAssetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrRoutingModule {}
