import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {OrderModel} from '../../_models/order.model';
import {ActivatedRoute} from '@angular/router';
import {BASE_API, CANCELED, CONFIRMED, NOT_ASSIGNED, ORDER, PASSED, SHIPPED, SHIPPING} from '../../_globals/vars';
import {HeaderModel} from '../../datatable/models/header.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  orderUrl: string;
  orders: OrderModel[];
  orderType;
  headers: HeaderModel[];
  fieldsName: string[];
  selectedOrder: OrderModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.orderType = params.type;
        if (this.orderType === 'passed') {
          this.orderUrl = BASE_API + ORDER + PASSED
        } else if (this.orderType === 'confirmed') {
          this.orderUrl = BASE_API + ORDER + CONFIRMED
        } else if (this.orderType === 'shipping') {
          this.orderUrl = BASE_API + ORDER + SHIPPING
        } else if (this.orderType === 'shipped') {
          this.orderUrl = BASE_API + ORDER + SHIPPED
        } else if (this.orderType === 'canceled') {
          this.orderUrl = BASE_API + ORDER + CANCELED
        } else if (this.orderType === 'pending') {
          this.orderUrl = BASE_API + ORDER + NOT_ASSIGNED
        }
        console.log(this.orderUrl)
        this.selectedOrder = null
        // this.show = true
        if (this.orderType === 'passed') {

          this.headers = [
            {
              title: 'id',
              searchKey: 'id',
              sortKey: 'id'
            },
            {
              title: 'price_min',
              searchKey: 'price_min',
              sortKey: 'price_min'
            },
            {
              title: 'price_max',
              searchKey: 'price_max',
              sortKey: 'price_max'
            },
            {
              title: 'zone',
              searchKey: 'client@clientDetails@city',
              sortKey: 'client@clientDetails@city'
            },
            {
              title: 'created_at',
              searchKey: 'created_at',
              sortKey: 'created_at'
            }
          ];
          this.fieldsName = [
            'id',
            'price_min',
            'price_max',
            'client.client_details.city',
            'created_at'
          ]
        } else {

          this.headers = [
            {
              title: 'id',
              searchKey: 'id',
              sortKey: 'id'
            },
            {
              title: 'price_min',
              searchKey: 'price_min',
              sortKey: 'price_min'
            },
            {
              title: 'price_max',
              searchKey: 'price_max',
              sortKey: 'price_max'
            },
            {
              title: 'prenom Livreur',
              searchKey: 'deliveryMan@first_name',
              sortKey: 'deliveryMan@first_name'
            },
            {
              title: 'zone',
              searchKey: 'client@clientDetails@city',
              sortKey: 'client@clientDetails@city'
            },
            {
              title: 'created_at',
              searchKey: 'created_at',
              sortKey: 'created_at'
            }
          ];
          this.fieldsName = [
            'id',
            'price_min',
            'price_max',
            'delivery_man.first_name',
            'client.client_details.city',
            'created_at'
          ]
        }
      });
  }

  ngOnInit() {

  }

}
