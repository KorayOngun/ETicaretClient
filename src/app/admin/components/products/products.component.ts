import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(s:NgxSpinnerService, private httpClientService: HttpClientService) {
    super(s);
  }

  ngOnInit(): void {
    this.httpClientService.get<Product[]>({controller:"products"}).subscribe(data=>console.table(data))
    
    // this.httpClientService.get(
    //   {
    //     controller:"products",
    //     fullEndPoint:"https://jsonplaceholder.typicode.com/posts"
    //   }).subscribe(data=>console.log(data));
  }
}

