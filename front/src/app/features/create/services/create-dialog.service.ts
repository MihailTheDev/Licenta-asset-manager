import { Injectable } from '@angular/core';
import { DialogParentAssetComponent } from '../dialogs';

@Injectable({
  providedIn: 'root',
})
export class CreateDialogService {
  constructor() {}

  public open(matDialog: any): void {
    let dialogRef = matDialog.open(DialogParentAssetComponent, {
      height: '400px',
      width: '600px',
    });

    return dialogRef.afterClosed();
  }
}
