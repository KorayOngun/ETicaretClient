import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent {

constructor(private productService:ProductService,s:NgxSpinnerService, private alertify:AlertifyService) {
 super(s); 
}

create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
 const create_product: Create_Product = new Create_Product();
 create_product.Name = name.value;
 create_product.Stock = parseInt(stock.value);
 create_product.Price = parseFloat(price.value);
 if(!name.value) {
  this.alertify.message("lütgfen ürün adını girin",{
    dismissOthers:true,
    messageType:MessageType.Error,
    position:Position.TopRight
  });
  return; 
 }
 if(parseInt(stock.value)<0) {
  this.alertify.message("lütfen stock bilgisi girin",{
    dismissOthers:true,
    messageType:MessageType.Error,
    position:Position.TopRight
  });
  return; 
 }

 this.productService.create(create_product, ()=> 
 {
  this.hideSpinner(SpinnerType.BallAtom);
  this.alertify.message("ürün başarıyla eklenmiştir",{
    dismissOthers:true,
    messageType:MessageType.Success,
    position:Position.TopRight
  });
},(message)=>{
  this.alertify.message(message,{
    dismissOthers:true,
    messageType:MessageType.Error,
    position:Position.TopRight
  });
}
);
  this.showSpinner(SpinnerType.BallAtom);
}
}
