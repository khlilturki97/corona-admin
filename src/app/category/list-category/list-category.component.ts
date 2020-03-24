import {Component, OnInit} from '@angular/core';
import {HeaderModel} from '../../datatable/models/header.model';
import {CategoryModel} from '../../_models/category.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {BASE_API, CATEGORY} from '../../_globals/vars';
import {CanEditModel} from '../../datatable/models/can-edit.model';
import {InitilizeJQScriptsService} from '../../_services/initilize-jqscripts.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  url: string;
  type;
  headers: HeaderModel[];
  fieldsName: string[];
  selectedCategory: CategoryModel;
  canEdit: CanEditModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private jqService: InitilizeJQScriptsService) {
    route.params
      .subscribe(params => {
        this.url = BASE_API + CATEGORY;
        this.selectedCategory = null;
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
        ];
        this.fieldsName = [
          'name',
          'description',
          'image'
        ]

        this.canEdit = {
          editWhere: 'both',
          editPermission: 'yes'
        }
      });
  }

  ngOnInit() {
    // this.jqService.initilizeJQScript();
  }

}
