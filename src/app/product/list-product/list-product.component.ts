import { Component, OnInit } from '@angular/core';
import {HeaderModel} from '../../datatable/models/header.model';
import {ProductModel} from '../../_models/product.model';
import {CanEditModel} from '../../datatable/models/can-edit.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {BASE_API, PRODUCT} from '../../_globals/vars';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  url: string;
  type;
  headers: HeaderModel[];
  fieldsName: string[];
  selectedProduct: ProductModel;
  canEdit: CanEditModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.url = BASE_API + PRODUCT;
        this.selectedProduct = null;
        // this.show = true

        this.headers = [
          {
            title: 'name',
            searchKey: 'name',
            sortKey: 'name',
            datatableEditKey: 'name'
          },
          {
            title: 'description',
            searchKey: 'description',
            sortKey: 'description'
          },
          {
            title: 'image',
            searchKey: 'image',
            sortKey: 'image',
            isImage: true
          },
          {
            title: 'price_min',
            searchKey: 'price_min',
            sortKey: 'price_min',
            datatableEditKey: 'price_min',
          },
          {
            title: 'price_max',
            searchKey: 'price_max',
            sortKey: 'price_max',
            datatableEditKey: 'price_max',
          },
          {
            title: 'max_quantity',
            searchKey: 'max_quantity',
            sortKey: 'max_quantity',
            datatableEditKey: 'max_quantity',
          },
          {
            title: 'categorie',
            searchKey: 'category@name',
            sortKey: 'category@name',
          },
        ];
        this.fieldsName = [
          'name',
          'description',
          'image',
          'price_min',
          'price_max',
          'max_quantity',
          'category.name',
        ]

        this.canEdit = {
          editWhere: 'both',
          editPermission: 'yes'
        }
      });
  }

  ngOnInit() {
  }

}
