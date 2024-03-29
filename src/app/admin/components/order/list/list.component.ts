import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'orderCode',
    'userName',
    'totalPrice',
    'CreatedDate',
    'ViewDetail',
    'Delete',
  ];
  dataSource: MatTableDataSource<List_Order> = null;

  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private diaglogService: DialogService
  ) {
    super(spinner);
  }

  async getOrders() {

    this.showSpinner(SpinnerType.BallAtom);
    const allOrders = await this.orderService.getAll(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
      },
      (err) =>
        this.alertifyService.message(err, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        })
    );
    this.dataSource = new MatTableDataSource<List_Order>(
      allOrders.orders
    );
    this.paginator.length = allOrders.totalOrderCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit(): Promise<void> {
    await this.getOrders();
  }

  showDetail(id: string) {
    this.diaglogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width: '750px',
      }
    })
  }

}
