import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Token } from '../../../contracts/token/token';

import { CustomToastrService, ToasterPosition, ToastrMessageType } from '../../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User) {
    const observable: Observable<CreateUser | User> = this.httpClient.post<CreateUser | User>({
      controller: "users"
    }, user)
    return await firstValueFrom(observable) as CreateUser;
  }

  async login(userNameOrEmail: string, password: string, callbackFunction?: () => void): Promise<void> {
    const observable: Observable<any | Token> = this.httpClient.post<any | Token>({
      controller: "users",
      action: "login"
    },{
      userNameOrEmail: userNameOrEmail,
      password: password
    })
    const token: Token = await lastValueFrom(observable) as Token;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);

      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır", "Giriş başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToasterPosition.TopCenter
      })
    }
    callbackFunction();
  }

}
