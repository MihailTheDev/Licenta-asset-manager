import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCreateRequestComponent } from '../../dialogs/dialog-create-request/dialog-create-request.component';
import { DialogCreateTicketComponent } from '../../dialogs/dialog-create-ticket/dialog-create-ticket.component';

@Injectable({
  providedIn: 'root',
})
export class HomeDialogService {
  public openRequest(
    matDialog: any,
    selectedItems: any[],
    multipleSelect: boolean,
  ): Observable<any> {
    let dialogRef = matDialog.open(DialogCreateRequestComponent, {
      height: '600px',
      width: '800px',
      data: {
        selectedItems,
        multipleSelect,
      },
    });

    return dialogRef.afterClosed();
  }

  public openTicket(
    matDialog: any,
    selectedItems: any[],
    multipleSelect: boolean,
  ): Observable<any> {
    let dialogRef = matDialog.open(DialogCreateTicketComponent, {
      height: '600px',
      width: '800px',
      data: {
        selectedItems,
        multipleSelect,
      },
    });

    return dialogRef.afterClosed();
  }
}
