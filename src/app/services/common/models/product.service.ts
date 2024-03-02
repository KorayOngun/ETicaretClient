import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: any) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error.errors;
          const keys = Object.keys(_error);
          let message = '';
          keys.forEach((key) => {
            _error[key].forEach((err) => {
              message += `${err}<br>`;
            });
          });
          errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: any,
    errorCallBack?: any
  ): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const result = firstValueFrom(
      this.httpClientService.get<{
        totalProductCount: number;
        products: List_Product[];
      }>({
        controller: 'products',
        query: `page=${page}&size=${size}`,
      })
    );

    result
      .then((d) => successCallBack())
      .catch((err: HttpErrorResponse) => errorCallBack(err.message));

    return await result;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete(
      {
        controller: 'products',
      },
      id
    );
    await firstValueFrom(deleteObservable);
  }

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getimages',
          controller: 'products',
        },
        id
      );
    const images = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'deleteproductimage',
        controller: 'products',
        query: `?imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {
    const changeShowcaseObservable = this.httpClientService.get({
      controller: "products",
      action: "ChangeShowcaseImage",
      query: `imageId=${imageId}&productId=${productId}`
    });

    await firstValueFrom(changeShowcaseObservable);
    successCallBack();
  }

}
