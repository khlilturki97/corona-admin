import {NgModule} from '@angular/core';

import {ProductRoutingModule} from './product-routing.module';
import {ListProductComponent} from './list-product/list-product.component';
import {FormProductComponent} from './form-product/form-product.component';
import {SharedModule} from '../_modules/shared.module';


@NgModule({
  declarations: [ListProductComponent, FormProductComponent],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule {
}
