import * as moment from 'moment';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-details-report',
  templateUrl: './modal-details-report.component.html',
  styleUrls: ['./modal-details-report.component.scss'],
})
export class ModalDetailsReportComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public reportData: any,
    public dialogRef: MatDialogRef<ModalDetailsReportComponent>
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.dialogRef.close();
  }

  public getTime(date: any) {
    const today = moment();
    let dateReport = moment(date);
    let result = today.diff(dateReport, 'days');

    if (result === 0) {
      return '0 días';
    } else {
      return '- ' + result + ' días';
    }
  }
}
