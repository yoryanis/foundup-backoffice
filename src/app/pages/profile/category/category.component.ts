import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/entities';
import { CategoryService } from 'src/app/services';
import { ModalAddCategoryComponent } from '../../../components/modals/modal-add-category/modal-add-category.component';
import { RemoveComponent } from 'src/app/components/modals/remove/remove.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay, first } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource();
  public page: number = 1;
  public currentElements: number = 12;
  public displayedColumns: string[] = ['num', 'name', 'actions'];
  public resultsLength: number = 0;

  constructor(
    public dialog: MatDialog,
    private readonly categoryService: CategoryService
  ) {
    this.blockUI.start('Cargando...');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public add() {
    this.dialog
      .open(ModalAddCategoryComponent, {
        width: '650px',
        height: '300px',
        data: '',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getCategories();
        }
      });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public edit(category: any) {
    this.dialog
      .open(ModalAddCategoryComponent, {
        width: '650px',
        height: '300px',
        data: category,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.getCategories();
      });
  }

  private getCategories() {
    this.categoryService
      .getAll()
      .pipe(first())
      .pipe(delay(100))
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.blockUI.stop();
      });
  }
}
