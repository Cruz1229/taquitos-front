import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPageRoutingModule } from './food-routing.module';

import { FoodPage } from './food.page';
import { ModalProductComponent } from '../components/modal-product/modal-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPageRoutingModule
  ],
  declarations: [FoodPage, ModalProductComponent]
})
export class FoodPageModule {}
