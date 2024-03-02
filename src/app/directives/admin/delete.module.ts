import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDirective } from './delete.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [DeleteDirective],
  imports: [
    CommonModule
  ],
  exports: [
    DeleteDirective,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ]
})
export class DeleteModule { }
