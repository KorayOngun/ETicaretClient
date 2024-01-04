import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { FileUploadModule } from './services/common/file-upload/file-upload.module';
import { DialogModule } from './dialogs/dialog.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    DialogModule,
    FileUploadModule,
  ],
  providers: [
    { provide: 'baseUrl', useValue: 'https://localhost:7172/api', multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
