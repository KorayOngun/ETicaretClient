import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any

@Component({
  selector: 'app-shoppinn-complete-dialog',
  templateUrl: './shoppinn-complete-dialog.component.html',
  styleUrls: ['./shoppinn-complete-dialog.component.scss']
})
export class ShoppinnCompleteDialogComponent extends BaseDialog<ShoppinnCompleteDialogComponent> implements OnDestroy {
  show: boolean = false;
  complete() {
    this.show = true;
  }
  constructor(dialogRef: MatDialogRef<ShoppinnCompleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteDialogState) {
    super(dialogRef)
  }
  ngOnDestroy(): void {
    if (!this.show) {
      $("#basketModal").modal("show")
    }
  }
}
export enum ShoppingCompleteDialogState {
  Yes,
  No
}
