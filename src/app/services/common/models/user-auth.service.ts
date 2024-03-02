import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient: HttpClientService, private toastrService: CustomToastrService, private authService: AuthService) { }
  async login(userNameOrEmail: string, password: string, callbackFunction?: () => void): Promise<void> {
    const observable: Observable<any | Token> = this.httpClient.post<any | Token>({
      controller: "auth",
      action: "login"
    }, {
      userNameOrEmail: userNameOrEmail,
      password: password
    })
    const token: Token = await lastValueFrom(observable) as Token;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("refreshToken", token.token.refreshToken);
      this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır", "Giriş başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToasterPosition.TopCenter
      })
    }
    callbackFunction();
  }

  async googleLogin(user: SocialUser, callbackFunction?: () => void): Promise<any> {
    const observable: Observable<Token> = this.httpClient.post<SocialUser | Token>({
      action: "googlelogin",
      controller: "auth",
    }, user) as Observable<Token>

    const tokenResponse = await lastValueFrom(observable);
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken.toString());
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("google üzerinden giriş başarıyla sağlanmıştır", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToasterPosition.TopCenter
      })
    }

    callbackFunction();
  }

  async refreshTokenLogin(refreshToken: string, callbackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | Token> = this.httpClient.post({
      action: "RefreshTokenLogin",
      controller: "Auth",
    }, {
      RefreshToken: refreshToken
    })
    try {
      console.log("refreshToken Çalıştı");
      const response: Token = await firstValueFrom(observable) as Token;
      localStorage.setItem("accessToken", response.token.accessToken.toString());
      localStorage.setItem("refreshToken", response.token.refreshToken);
      this.authService.identityCheck();
      callbackFunction(response ? true : false);
    } catch (error) {
      callbackFunction(false);
    }

  }
}
