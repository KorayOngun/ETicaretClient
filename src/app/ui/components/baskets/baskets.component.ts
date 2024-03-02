import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogState, ShoppinnCompleteDialogComponent } from 'src/app/dialogs/shoppinn-complete-dialog/shoppinn-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss'],
})
export class BasketsComponent extends BaseComponent implements OnInit {


  constructor(s: NgxSpinnerService,
    private basketService: BasketService,
    private orderService: OrderService,
    private toastr: CustomToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {
    super(s);
  }
  basketItems: List_Basket_Item[]
  async ngOnInit() {
    this.showSpinner(SpinnerType.BallAtom);
    this.basketItems = await this.basketService.get();
    console.log(this.basketItems);
    this.hideSpinner(SpinnerType.BallAtom);
  }
  shoppingComplete() {
    $("#basketModal").modal("hide")
    this.dialogService.openDialog({
      componentType: ShoppinnCompleteDialogComponent,
      data: ShoppingCompleteDialogState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        const order: Create_Order = new Create_Order();
        order.address = "adres";
        order.description = "açıklama";
        this.orderService.create(order);
        this.hideSpinner(SpinnerType.BallAtom);
        this.toastr.message("sipariş alınmıştır", "Sipariş", {
          messageType: ToastrMessageType.Success,
          position: ToasterPosition.TopRight
        })
        this.router.navigate(["/"])
      }
    })


  }
  removeBasketItem(id: string) {
    $("#basketModal").modal("hide")
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallAtom);
        this.basketService.remove(id);
        $("." + id).fadeOut(500, () => {
          this.hideSpinner(SpinnerType.BallAtom);
        });
        $("#basketModal").modal("show")
      },
    })

  }
  async changeQuantity(object: any) {
    console.log("degisti")
    this.showSpinner(SpinnerType.BallAtom);
    const basketItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value as number;
    const basketItem: Update_basket_Item = new Update_basket_Item();
    basketItem.quantity = quantity;
    basketItem.basketItemId = basketItemId;
    await this.basketService.updateQuantity(basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
  }
}
