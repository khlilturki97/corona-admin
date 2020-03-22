import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import {SharedModule} from '../_modules/shared.module';
import { DetailOrderComponent } from './detail-order/detail-order.component';


@NgModule({
  declarations: [ListOrderComponent, DetailOrderComponent],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
