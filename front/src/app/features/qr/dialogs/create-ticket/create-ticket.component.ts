import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent {
  public textControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<CreateTicketComponent>) {}

  public onSubmit(): void {
    this.dialogRef.close(this.textControl.value);
  }
}
