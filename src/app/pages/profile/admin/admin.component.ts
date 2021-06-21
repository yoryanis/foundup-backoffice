import * as moment from 'moment';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay, first } from 'rxjs/operators';

import { AuthService, GlobalService, UserService } from 'src/app/services';
import { ModalAddAdminComponent } from '../../../components/modals/modal-add-admin/modal-add-admin.component';
import { RemoveComponent } from 'src/app/components/modals/remove/remove.component';
import { User } from 'src/app/entities';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public currentElements: number = 12;
  public dataSource = new MatTableDataSource();
  public endDate: any;
  public page: number = 1;
  public startDate: any;
  public userInfo!: User;
  public displayedColumns: string[] = [
    'num',
    'cc',
    'fullname',
    'city',
    'email',
    'created_at',
    'state',
    'actions',
  ];

  constructor(
    public dialog: MatDialog,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly userService: UserService
  ) {
    this.blockUI.start('Cargando...');
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.endDate = this.getFormattedTomorrow();
    this.startDate = this.getFormattedLastYears();

    this.getUsers(
      this.page,
      this.currentElements,
      this.startDate,
      this.endDate
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public add() {
    this.dialog
      .open(ModalAddAdminComponent, {
        width: '650px',
        height: '650px',
        data: '',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.getUsers(
            this.page,
            this.currentElements,
            this.startDate,
            this.endDate
          );
      });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public edit(user: any) {
    this.dialog
      .open(ModalAddAdminComponent, {
        width: '650px',
        height: '650px',
        data: user,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.getUsers(
            this.page,
            this.currentElements,
            this.startDate,
            this.endDate
          );
      });
  }

  public remove(user: User) {
    this.dialog
      .open(RemoveComponent, {
        width: '600px',
        height: '280px',
        data: { data: user, admin: true },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.getUsers(
            this.page,
            this.currentElements,
            this.startDate,
            this.endDate
          );
      });
  }

  private getFormattedLastYears(): string {
    const instant = moment(new Date()).add(-12, 'M');
    return instant.format('YYYY-MM-DD');
  }

  private getFormattedTomorrow(): string {
    const instant = moment(new Date()).add(1, 'd');
    return instant.format('YYYY-MM-DD');
  }

  private getUsers(
    page: number,
    currentElements: number,
    startDate: string,
    endDate: string
  ) {
    this.userService
      .getAll(
        page,
        currentElements,
        startDate,
        endDate,
        this.userInfo.identification
      )
      .pipe(first())
      .pipe(delay(100))
      .subscribe((res) => {
        this.dataSource.data = res.data.records;
        this.blockUI.stop();
      });
  }
}
