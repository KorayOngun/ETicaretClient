import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import {  firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:Create_Product,successCallBack?:any,errorCallBack?:any){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result => 
      {
        successCallBack();
      },(errorResponse:HttpErrorResponse)=>{
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error.errors;
        const keys = Object.keys(_error);
         let message = "";
         keys.forEach(key=>{
          _error[key].forEach(err=>{
            message += `${err}<br>`;
          })
        })
         errorCallBack(message);
        }
      );
  }

  async read(page:number=0,size:number=5,successCallBack?:any,errorCallBack?:any):Promise<{totalCount: number,products: List_Product[]}>{
    const result = firstValueFrom(this.httpClientService.get<{totalCount: number,products: List_Product[]}>({
      controller:"products",
      action:"get",
    query: `page=${page}&size=${size}`
    }))
    
    result
    .then(d => successCallBack())
    .catch((err: HttpErrorResponse) => errorCallBack(err.message));

    return await result;

  }

}
