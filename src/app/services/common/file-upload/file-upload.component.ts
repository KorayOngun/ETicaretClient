import { Component, Input } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../admin/alertify.service';
import {
  CustomToastrService,
  ToasterPosition,
  ToastrMessageType,
} from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import {
  FileUploadDialogComponent,
  FileUploadDialogState,
} from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  public files: NgxFileDropEntry[];
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {}
  @Input() options: Partial<FileUploadOptions>;
  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService
          .post(
            {
              controller: this.options.controller,
              action: this.options.action,
              query: this.options.queryString,
              headers: new HttpHeaders({ responseType: 'blob' }),
            },
            fileData
          )
          .subscribe(
            (data) => {
              const message = 'dosyalar başarıyla yüklenmiştir';
              if (this.options.isAdminPage) {
                this.alertifyService.message(message, {
                  dismissOthers: true,
                  messageType: MessageType.Success,
                  position: Position.TopRight,
                });
              } else {
                this.customToastrService.message(message, 'başarılı.', {
                  messageType: ToastrMessageType.Success,
                  position: ToasterPosition.TopRight,
                });
              }
            },
            (error: HttpErrorResponse) => {
              const message = 'dosyalar yüklenirken hata!!';

              if (this.options.isAdminPage) {
                this.alertifyService.message(message, {
                  dismissOthers: true,
                  messageType: MessageType.Error,
                  position: Position.TopRight,
                });
              } else {
                this.customToastrService.message(message, 'başarısız.', {
                  messageType: ToastrMessageType.Error,
                  position: ToasterPosition.TopRight,
                });
              }
            }
          );
      },
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}

function HttpHeadres() {
  throw new Error('Function not implemented.');
}
