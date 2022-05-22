import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductItemComponent } from './product-container/product-item/product-item.component';
import { ProductListComponent } from './product-container/product-list/product-list.component';
import { ProductSearchComponent } from './product-container/product-search/product-search.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const APP_PRODUCT_ROUTES: Routes = [
  {
    path: 'products',
    component: ProductContainerComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        pathMatch: 'full'
      }
    ],
  },
  {
    path: 'product',
    component: ProductContainerComponent,
    children: [
      {
        path: 'new',
        component: ProductCreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ProductContainerComponent, ProductListComponent, ProductSearchComponent, ProductItemComponent, ProductCreateComponent],
  imports: [SharedModule, RouterModule.forChild(APP_PRODUCT_ROUTES)],
})
export class ProductModule {}
