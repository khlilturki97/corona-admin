import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProductComponent} from './list-product/list-product.component';
import {FormProductComponent} from './form-product/form-product.component';


const routes: Routes = [

  {
    path: '',
    component: ListProductComponent
  },
  {
    path: 'form',
    component: FormProductComponent
  },
  {
    path: 'form/:id',
    component: FormProductComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
