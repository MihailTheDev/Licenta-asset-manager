import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
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
  multipleSelect: boolean = true;

  @Input()
  withPaginator: boolean = false;

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: any[] = [];

  @Input()
  selectedItems: any[] = [];

  @Input()
  pageSize: number;

  @Input()
  totalItems: number = 0;

  @Output()
  selectedItem: EventEmitter<any[]> = new EventEmitter();

  @Output()
  detailsClick: EventEmitter<any> = new EventEmitter();

  @Output()
  paginatorChange: EventEmitter<PageEvent> = new EventEmitter();

  @Output()
  elementUpdate: EventEmitter<any> = new EventEmitter();

  public tableData: MatTableDataSource<any>;
  public selection: SelectionModel<any>;

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (this.selectedItems.length > 0) {
      console.log(this.selectedItems);

      this.selection = new SelectionModel(this.multipleSelect, this.selectedItems);
    } else {
      this.selection = new SelectionModel(this.multipleSelect);
    }
    if (this.withSelect) {
      this.displayedColumns.unshift('select');
    }
    this.selectedItem.emit(this.selection.selected);
    this.selection.changed.pipe(filter(() => this.withSelect)).subscribe(() => {
      console.log('change');

      this.selectedItem.emit(this.selection.selected);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSource) {
      this.tableData = new MatTableDataSource<any>(this.dataSource);
      this.cd.detectChanges();
    }
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableData.data.forEach((row) => this.selection.select(row));
  }

  public changeSelectRow(event: MatCheckboxChange, row?: any): void {
    if (!event) {
      return;
    }

    if (row) {
      this.selection.toggle(row);
    } else {
      this.masterToggle();
    }
  }

  public goToDetails(element: any): void {
    this.detailsClick.emit(element);
  }

  public pageChange(paginator: any): void {
    this.paginatorChange.emit(paginator);
  }

  public isElementSelected(element: any): boolean {
    return this.selection.selected.some((item) => item._id === element._id);
  }
}
