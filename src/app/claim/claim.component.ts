import { Component, OnInit } from '@angular/core';
import {HeaderModel} from '../datatable/models/header.model';
import {UserModel} from '../_models/user.model';
import {CanEditModel} from '../datatable/models/can-edit.model';
import {CrudService} from '../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {InitilizeJQScriptsService} from '../_services/initilize-jqscripts.service';
import {ADMIN, BASE_API, CLAIM, CLIENT, DELIVER_MAN} from '../_globals/vars';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  url: string;
  type;
  headers: HeaderModel[];
  fieldsName: string[];
  selectedUser: UserModel;
  canEdit: CanEditModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private jqService: InitilizeJQScriptsService) {
        this.url = BASE_API + CLAIM;
        this.selectedUser = null
        // this.show = true
          this.headers = [
            {
              title: 'first_name',
              searchKey: 'client@first_name',
              sortKey: 'client@first_name'
            },
            {
              title: 'last_name',
              searchKey: 'client@last_name',
              sortKey: 'client@last_name'
            },
            {
              title: 'email',
              searchKey: 'client@email',
              sortKey: 'client@email'
            },
            {
              title: 'subject',
              searchKey: 'subject',
              sortKey: 'subject'
            },
            {
              title: 'description',
              searchKey: 'description',
              sortKey: 'description'
            },
          ];
          this.fieldsName = [
            'client.first_name',
            'client.last_name',
            'client.email',
            'subject',
            'description'
          ]
  }

  ngOnInit() {
  }

}
