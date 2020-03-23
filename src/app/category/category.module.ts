import {NgModule} from '@angular/core';

import {CategoryRoutingModule} from './category-routing.module';
import {ListCategoryComponent} from './list-category/list-category.component';
import {FormCategoryComponent} from './form-category/form-category.component';
import {SharedModule} from '../_modules/shared.module';
import { DetailCategoryComponent } from './detail-category/detail-category.component';


@NgModule({
  declarations: [ListCategoryComponent, FormCategoryComponent, DetailCategoryComponent],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule {
}
