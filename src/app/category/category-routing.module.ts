import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCategoryComponent} from './list-category/list-category.component';
import {FormCategoryComponent} from './form-category/form-category.component';


const routes: Routes = [
  {
    path: '',
    component: ListCategoryComponent
  },
  {
    path: 'form',
    component: FormCategoryComponent
  },
  {
    path: 'form/:id',
    component: FormCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
