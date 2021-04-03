import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './pages';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogParentAssetComponent } from './dialogs';
import { MatDialogModule } from '@angular/material/dialog';
import { ElectronicAssetsFormComponent, UsableAssetsFormComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const MATERIAL_COMPONENTS: any[] = [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatButtonModule
];
@NgModule({
  imports: [CommonModule, CreateRoutingModule,ReactiveFormsModule, MATERIAL_COMPONENTS],
  declarations: [
    CreateComponent,
    DialogParentAssetComponent,
    ElectronicAssetsFormComponent,
    UsableAssetsFormComponent,
  ],
})
export class CreateModule {}
