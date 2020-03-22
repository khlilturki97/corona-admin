import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUserComponent} from './list-user/list-user.component';
import {FormUserComponent} from './form-user/form-user.component';


const routes: Routes = [
  {
    path: ':type',
    component: ListUserComponent
  },
  {
    path: ':type/form',
    component: FormUserComponent
  },
  {
    path: ':type/form/:id',
    component: FormUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
