import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from '../ui/custom-toastr.service';
import { AuthService } from './auth.service';
import { UserAuthService } from './models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: CustomToastrService, private userAuthService: UserAuthService, private authGuard: AuthService, private router: Router, private ngx: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(err => {

      switch (err.status) {
        case HttpStatusCode.Unauthorized:
          const url = this.router.url;
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
            if (!state) {
              if (url == "/products") {
                this.toastr.message("sepete ürün eklemek için oturum açmanız gerekiyor", "Oturum açınız", {
                  messageType: ToastrMessageType.Error,
                  position: ToasterPosition.BottomCenter
                })
              } else {
                this.toastr.message("bu işlemi yapmayı yetkiniz bulunmamaktadır", "yetkisiz işlem", {
                  messageType: ToastrMessageType.Warning,
                  position: ToasterPosition.TopLeft
                });
              }
            }
          }).then(data => {
          })
          break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucuya erişilmiyor !!!", "Sunucu Hatası", {
            messageType: ToastrMessageType.Error,
            position: ToasterPosition.TopLeft
          });

          break;
        case HttpStatusCode.BadRequest:
          this.toastr.message("Geçersiz İstek Yapıldı", "Geçersiz işlem", {
            messageType: ToastrMessageType.Error,
            position: ToasterPosition.TopLeft
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastr.message("Sayfa Bulunamadı", "Sayfa bulunamadı", {
            messageType: ToastrMessageType.Warning,
            position: ToasterPosition.TopLeft
          });
          break;
        default:
          this.toastr.message("Beklenmeyen bir hata meydana gelmiştir", "hata", {
            messageType: ToastrMessageType.Warning,
            position: ToasterPosition.TopLeft
          });
          break;
      }
      this.ngx.hide(SpinnerType.BallAtom);
      return of(err);
    }));
  }
}
