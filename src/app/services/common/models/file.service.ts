import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService: HttpClientService) {

  }

  async ImageBaseUrl(): Promise<any> {
    const obs: Observable<any> = this.httpClientService.get({
      controller: "configuration",
      action: "ImageBaseUrl",
    })


    return await firstValueFrom(obs)

  }
}
