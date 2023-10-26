import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdcutsModule } from './prodcuts/prodcuts.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProdcutsModule,
    HomeModule,
    BasketsModule
  ]
})
export class ComponentsModule { }
