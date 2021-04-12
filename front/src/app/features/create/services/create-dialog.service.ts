import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogParentAssetComponent } from '../dialogs';

@Injectable({
  providedIn: 'root',
})
export class CreateDialogService {
  constructor() {}

  public open(matDialog: any, selectedItems: any[]): Observable<any> {
    let dialogRef = matDialog.open(DialogParentAssetComponent, {
      height: '600px',
      width: '800px',
      data: {
        selectedItems,
      },
    });

    return dialogRef.afterClosed();
  }
}
