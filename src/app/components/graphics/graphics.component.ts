import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 0, 0, 0.3)',
        'rgba(0, 255, 0, 0.3)',
        'rgba(0, 0, 255, 0.3)',
        'rgba(169, 169, 169, 0.5)',
        'rgba(100, 149, 237, 0.3)',
        'rgba(250, 235, 215, 0.8)',
        'rgba(153, 50, 204, 0.3)',
        'rgba(72, 61, 139, 0.3)',
        'rgba(30, 144, 255, 0.3)',
        'rgba(255, 215, 0, 0.3)',
        'rgba(173, 255, 47, 0.3)',
        'rgba(240, 128, 128, 0.3)',
        'rgba(60, 179, 113, 0.3)',
        'rgba(0, 0, 128, 0.3)',
        'rgba(205, 133, 63, 0.3)',
        'rgba(46, 139, 87, 0.3)',
        'rgba(255, 255, 0, 0.3)',
        'rgba(245, 222, 179, 0.7)',
        'rgba(154, 205, 50, 0.3)',
      ],
    },
  ];
  /* Barras */
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [{ data: [], label: 'Reportes' }];

  /* Lineal */
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Encontrados' },
    { data: [], label: 'Reportados' },
  ];
  public lineChartLabels: Label[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  public lineChartColors: Color[] = [
    {
      // dark grey
      backgroundColor: 'rgb(149, 199, 153, 0.4)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart!: BaseChartDirective;
  @BlockUI() blockUI!: NgBlockUI;
  public count_bar!: number;
  public count_circle!: number;
  public count_lineal!: number;
  public year_current!: number;
  public years: number[] = [];

  constructor(private readonly reportService: ReportService) {
    this.blockUI.start('Cargando...');
  }

  ngOnInit(): void {
    this.getYears();
    this.year_current = this.years[0];

    this.getGeneral(this.year_current);
    this.getCategory(this.year_current);
    this.getCity(this.year_current);
  }

  public changeYard($event: any) {
    this.blockUI.start('Cargando...');
    this.getGeneral($event.value);
    this.getCity($event.value);
    this.getCategory($event.value);
  }

  private getCategory(year: any) {
    forkJoin([
      this.reportService
        .getAllCategory(year)
        .pipe(map((res) => res.data.categories.map((res: any) => res.count))),
      this.reportService
        .getAllCategory(year)
        .pipe(
          map((res) => res.data.categories.map((res: any) => res.category))
        ),
      this.reportService
        .getAllCategory(year)
        .pipe(map((res) => res.data.count.map((res: any) => res.count))),
    ]).subscribe(([value, city, count]) => {
      this.pieChartData = value;
      this.pieChartLabels = city;
      this.count_circle = count;
    });
  }

  private getCity(year: any) {
    forkJoin([
      this.reportService
        .getAllCity(year)
        .pipe(map((res) => res.data.cities.map((res: any) => res.count))),
      this.reportService
        .getAllCity(year)
        .pipe(map((res) => res.data.cities.map((res: any) => res.lost_place))),
      this.reportService
        .getAllCity(year)
        .pipe(map((res) => res.data.count.map((res: any) => res.count))),
    ]).subscribe(([value, city, count]) => {
      this.barChartData[0].data = value;
      this.barChartLabels = city;
      this.count_bar = count;
    });
  }

  private getGeneral(year: any) {
    forkJoin([
      this.reportService
        .getAllGeneral(year)
        .pipe(map((res) => res.data.founds.map((res: any) => res.count))),
      this.reportService
        .getAllGeneral(year)
        .pipe(map((res) => res.data.losts.map((res: any) => res.count))),
      this.reportService
        .getAllGeneral(year)
        .pipe(map((res) => res.data.count.map((res: any) => res.count))),
    ]).subscribe(([found, lost, count]) => {
      this.lineChartData[0].data = found;
      this.lineChartData[1].data = lost;
      this.count_lineal = count;
      this.blockUI.stop();
    });
  }

  private getYears() {
    let year_today = +moment(new Date()).format('YYYY');
    let year_past = 2000;
    for (let i = year_today; i >= year_past; i--) {
      this.years.push(i);
    }
  }
}
