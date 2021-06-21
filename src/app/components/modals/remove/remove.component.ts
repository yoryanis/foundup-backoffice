import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryService, GlobalService, UserService } from 'src/app/services';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.scss'],
})
export class RemoveComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public removeData: any,
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<RemoveComponent>
  ) {}

  ngOnInit(): void {}

  public onClose(refresh: boolean): void {
    this.dialogRef.close(refresh);
  }

  public onRemove() {
    this.userService.delete(this.removeData.data).subscribe(() => {
      this.onClose(true);
    });
  }
}
