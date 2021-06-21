import * as moment from 'moment';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { delay, first } from 'rxjs/operators';

import { ReportService } from 'src/app/services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetailsReportComponent } from '../modals/modal-details-report/modal-details-report.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public currentElements: number = 12;
  public dataSource = new MatTableDataSource();
  public endDate: any;
  public page: number = 1;
  public startDate: any;
  public displayedColumns: string[] = [
    'num',
    'name',
    'cc',
    'fullname',
    'phone',
    'email',
    'state',
    'created_at',
    'ticket',
    'actions',
  ];
  public range: any = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private readonly reportService: ReportService,
    public dialog: MatDialog
  ) {
    this.blockUI.start('Cargando...');
  }

  ngOnInit(): void {
    this.endDate = this.getFormattedTomorrow();
    this.startDate = this.getFormattedLastYears();

    this.getReport(
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getRange() {
    let start = moment(this.range.get('start').value).format('YYYY-MM-DD');
    let end = moment(this.range.get('end').value).format('YYYY-MM-DD');
    if (
      this.range.get('start').value !== null &&
      this.range.get('end').value !== null
    ) {
      this.blockUI.start('Loading...');
      this.getReport(this.page, this.currentElements, start, end);
    }
  }

  public getTime(date: any) {
    const today = moment();
    let dateReport = moment(date);
    let result = today.diff(dateReport, 'days');

    return result;
  }

  public viewDetails(report: any) {
    this.dialog
      .open(ModalDetailsReportComponent, {
        width: '650px',
        height: '650px',
        data: report,
      })
      .afterClosed()
      .subscribe((result) => {});
  }

  private getFormattedLastYears(): string {
    const instant = moment(new Date()).add(-12, 'M');
    return instant.format('YYYY-MM-DD');
  }

  private getFormattedTomorrow(): string {
    const instant = moment(new Date()).add(1, 'd');
    return instant.format('YYYY-MM-DD');
  }

  private getReport(
    page: number,
    currentElements: number,
    startDate: string,
    endDate: string
  ) {
    this.reportService
      .getAll(page, currentElements, startDate, endDate)
      .pipe(first())
      .pipe(delay(100))
      .subscribe((res) => {
        this.dataSource.data = res.data.records;
        this.blockUI.stop();
      });
  }
}
