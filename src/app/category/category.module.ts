import {NgModule} from '@angular/core';

import {CategoryRoutingModule} from './category-routing.module';
import {ListCategoryComponent} from './list-category/list-category.component';
import {FormCategoryComponent} from './form-category/form-category.component';
import {SharedModule} from '../_modules/shared.module';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import {GetStatusTextPipe} from '../_pipes/get-status-text.pipe';
import {FixImagePathPipe} from '../_pipes/fix-image-path.pipe';


@NgModule({
  declarations: [ListCategoryComponent, FormCategoryComponent, DetailCategoryComponent,    FixImagePathPipe,
    GetStatusTextPipe,
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule {
}
