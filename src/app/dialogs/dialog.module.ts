import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DeleteDialogComponent, SelectProductImageDialogComponent],
  exports: [DeleteDialogComponent, SelectProductImageDialogComponent],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    MatCardModule,
    NgxSpinnerModule,
  ],
})
export class DialogModule {}
