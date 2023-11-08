import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Stock', 'Price', 'CreatedDate','UpdatedDate','Edit','Delete'];
  dataSource: MatTableDataSource<List_Product> =null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner:NgxSpinnerService, private productService: ProductService,private alertifyService: AlertifyService) {
    super(spinner);
  }

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom)
    const allProducts = await this.productService.read(this.paginator ? this.paginator.pageIndex:0,this.paginator ? this.paginator.pageSize: 5,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    },(err)=>this.alertifyService.message(err,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position: Position.TopRight
    }))
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
 
  

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  // delete(id:string,event){
  //   const img: HTMLImageElement = event.srcElement.parentElement.parentElement;
  //   $(img).fadeOut(500)
  // }
}
