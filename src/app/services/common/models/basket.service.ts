import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { Update_basket_Item } from 'src/app/contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient: HttpClientService) { }

  async get(): Promise<List_Basket_Item[]> {
    const observable: Observable<List_Basket_Item[]> = this.httpClient.get({
      controller: "baskets",
    })
    return await firstValueFrom(observable);
  }

  async add(basketItem: Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClient.post({
      controller: "baskets"
    }, basketItem)
    await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Update_basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClient.put({
      controller: "baskets"
    }, basketItem);
    await firstValueFrom(observable);
  }

  async remove(basketItemId: string) {
    const observable: Observable<any> = this.httpClient.delete({
      controller: "baskets",
    }, basketItemId);

    await firstValueFrom(observable);
  }

}
