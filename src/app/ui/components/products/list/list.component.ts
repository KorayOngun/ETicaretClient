import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  /**
   *
   */
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService, private basketService: BasketService, spinner: NgxSpinnerService, private toastr: CustomToastrService) {
    super(spinner);
  }
  baseUrl: any;
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 4;
  pageList: number[] = [];

  products: List_Product[];
  async ngOnInit(): Promise<void> {
    this.baseUrl = await this.fileService.ImageBaseUrl();
    console.log(this.baseUrl.url);
    this.activatedRoute.params.subscribe(async params => {

      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => {
        console.log("ürünler geldi")
      }, (err) => {
        console.log(err);
      });
      this.products = data.products;

      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          name: p.name,
          price: p.price,
          stock: p.stock,
          imagePath: p.productImages.length ? this.baseUrl.url + "" + p.productImages.find(p => p.showcase == true).path + "/" + p.productImages.find(p => p.showcase == true).fileName : "",
          updatedDate: p.updatedDate
        };
        return listProduct;
      })


      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      var index = -3;

      while (index < 4) {
        if (this.currentPageNo + index > 0 && index <= 0) {
          this.pageList.push(this.currentPageNo + index);
        } else if (this.currentPageNo + index <= this.totalPageCount && index > 0) {
          this.pageList.push(this.currentPageNo + index);
        }
        index = index + 1;
      }

    });

  }
  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallAtom);
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.BallAtom);
    this.toastr.message("ürün sepete eklenmiştir", "Sepete Eklendi", {
      messageType: ToastrMessageType.Success,
      position: ToasterPosition.TopLeft
    })
  }
}
