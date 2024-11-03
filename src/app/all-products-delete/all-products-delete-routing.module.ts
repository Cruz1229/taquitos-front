import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProductsDeletePage } from './all-products-delete.page';

const routes: Routes = [
  {
    path: '',
    component: AllProductsDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProductsDeletePageRoutingModule {}
