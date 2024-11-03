import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProductsDeletePageRoutingModule } from './all-products-delete-routing.module';

import { AllProductsDeletePage } from './all-products-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProductsDeletePageRoutingModule
  ],
  declarations: [AllProductsDeletePage]
})
export class AllProductsDeletePageModule {}
