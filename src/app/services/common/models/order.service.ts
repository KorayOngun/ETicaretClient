import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Order } from 'src/app/contracts/order/list_order';
import { Single_Order } from 'src/app/contracts/order/single_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClientService) { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClient.post({
      controller: "orders"
    }, order)
    await firstValueFrom(observable);
  }
  async getAll(page: number = 0, size: number = 5, successCallBack?: any,
    errorCallBack?: (errorMessage: string) => void): Promise<{ totalOrderCount: number; orders: List_Order[] }> {
    const observable: Observable<{
      totalOrderCount: number; orders: List_Order[]
    }> = this.httpClient.get({
      controller: "orders",
      query: `page=${page}&size=${size}`,
    });

    const promiseData = firstValueFrom(observable);

    promiseData.then(value => successCallBack()).catch((err) => errorCallBack(err))
    return await promiseData;

  }

  async getOrderById(id: string, successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void): Promise<Single_Order> {
    const observable: Observable<Single_Order> = this.httpClient.get<Single_Order>({
      controller: "orders",
    }, id)
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch((err) => errorCallBack(err))
    return await promiseData;

  }
}
