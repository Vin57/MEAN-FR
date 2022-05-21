import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductFormComponent } from './product-container/product-form/product-form.component';
import { ProductItemComponent } from './product-container/product-item/product-item.component';
import { ProductListComponent } from './product-container/product-list/product-list.component';

const APP_PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductContainerComponent,
    children: [
      {
        path: ':product',
        component: ProductListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ProductContainerComponent, ProductListComponent, ProductFormComponent, ProductItemComponent],
  imports: [SharedModule, RouterModule.forChild(APP_PRODUCT_ROUTES)],
})
export class ProductModule {}
