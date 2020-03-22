import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import {SharedModule} from '../_modules/shared.module';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { FormUserComponent } from './form-user/form-user.component';


@NgModule({
  declarations: [ListUserComponent, DetailUserComponent, FormUserComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
