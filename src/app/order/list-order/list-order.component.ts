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

  url: string;
  type;
  headers: HeaderModel[];
  fieldsName: string[];
  selectedOrder: OrderModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.type = params.type;
        if (this.type === 'passed') {
          this.url = BASE_API + ORDER + PASSED
        } else if (this.type === 'confirmed') {
          this.url = BASE_API + ORDER + CONFIRMED
        } else if (this.type === 'shipping') {
          this.url = BASE_API + ORDER + SHIPPING
        } else if (this.type === 'shipped') {
          this.url = BASE_API + ORDER + SHIPPED
        } else if (this.type === 'canceled') {
          this.url = BASE_API + ORDER + CANCELED
        } else if (this.type === 'pending') {
          this.url = BASE_API + ORDER + NOT_ASSIGNED
        }
        console.log(this.url)
        this.selectedOrder = null
        // this.show = true
        if (this.type === 'passed') {

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
              searchKey: 'client@city',
              sortKey: 'client@city'
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
            'client.city',
            'created_at'
          ]
        }
      });
  }

  ngOnInit() {

  }

}
