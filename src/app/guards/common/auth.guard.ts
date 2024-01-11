import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';

export const authGuard: CanActivateFn = (route, state) => {

  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router = inject(Router)
  const toastr = inject(CustomToastrService);

  const token: string = localStorage.getItem("accessToken");
  // const expirationDate: Date = jwtHelper.getTokenExpirationDate(token);
  let expired: boolean;

  try {
    expired = jwtHelper.isTokenExpired(token);
  } catch (error) {
    expired = true;
  }
  if (!token || expired) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastr.message("oturum açmanız gerekiyor", "Yetkisiz Erişim", {
      messageType: ToastrMessageType.Error,
      position: ToasterPosition.TopFullWidth
    })
    return false;
  }

  return true;
};
