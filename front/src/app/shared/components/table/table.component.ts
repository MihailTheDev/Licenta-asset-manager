import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input()
  withSelect: boolean = false;

  @Input()
  withPaginator: boolean = false;

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: any[] = [];

  @Input()
  selectedItems: any[] = [];

  @Output()
  selectedItem: EventEmitter<any[]> = new EventEmitter();

  public tableData: MatTableDataSource<any>;
  public selection: SelectionModel<any>;

  ngOnInit(): void {
    if (this.selectedItems.length > 0) {
      this.selection = new SelectionModel(true, this.selectedItems);
    } else {
      this.selection = new SelectionModel(true);
    }
    if (this.withSelect) {
      this.displayedColumns.unshift('select');
    }
    this.selectedItem.emit(this.selection.selected);
    this.selection.changed.pipe(filter(() => this.withSelect)).subscribe(() => {
      this.selectedItem.emit(this.selection.selected);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.tableData = new MatTableDataSource<any>(this.dataSource);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableData.data.forEach((row) => this.selection.select(row));
  }

  changeSelectRow(event: MatCheckboxChange, row?: any): void {
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
