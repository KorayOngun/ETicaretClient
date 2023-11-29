import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private productService: ProductService,private alertifyService: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent
  createdProduct(p: Create_Product) { //TODO : Param. gerekli mi?
    this.listComponents.getProducts();
  }
}
