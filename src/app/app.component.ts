import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToasterPosition, ToastrMessageType } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { ComponentName, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { NgTemplateOutlet } from '@angular/common';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;

  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("oturum kapatılmıştır", "Oturum kapatıldı", {
      messageType: ToastrMessageType.Info,
      position: ToasterPosition.TopCenter
    })
  }

  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.identityCheck();
  }
  ngOnInit(): void { }
  async loadComponent() {
    await this.dynamicLoadComponentService.loadComponent(ComponentName.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }
  title = 'ETicaretClient';
}
