import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../_models/order.model';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  @Input() order: OrderModel

  constructor() {
  }

  ngOnInit() {
  }

}
