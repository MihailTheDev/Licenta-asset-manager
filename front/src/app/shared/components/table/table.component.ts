import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
export interface ModalAssetItem {
  name: string;
  group: string;
  serialNumber: string;
}

const ELEMENT_DATA: ModalAssetItem[] = [
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
  {
    name: 'Unitate acer A4201',
    group: 'Birotica',
    serialNumber: '123456789ABCDEF',
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input()
  withSelect: boolean = false;

  @Output()
  selectedItem: EventEmitter<any[]> = new EventEmitter();

  displayedColumns: string[] = ['name', 'group', 'serialNumber'];
  dataSource = new MatTableDataSource<ModalAssetItem>(ELEMENT_DATA);
  selection = new SelectionModel<ModalAssetItem>(true, []);

  ngOnInit(): void {
    console.log(this.dataSource);

    if (this.withSelect) {
      this.displayedColumns.unshift('select');
    }
    this.selectedItem.emit(this.selection.selected);
    this.selection.changed.pipe(filter(() => this.withSelect)).subscribe(() => {
      this.selectedItem.emit(this.selection.selected);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  changeSelectRow(event: MatCheckboxChange, row?: ModalAssetItem): void {
    if (!event) {
      return;
    }

    if (row) {
      this.selection.toggle(row);
    } else {
      this.masterToggle();
    }
  }
}
