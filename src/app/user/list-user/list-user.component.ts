import {Component, OnInit} from '@angular/core';
import {HeaderModel} from '../../datatable/models/header.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute} from '@angular/router';
import {ADMIN, BASE_API, CLIENT, DELIVER_MAN} from '../../_globals/vars';
import {UserModel} from '../../_models/user.model';
import {CanEditModel} from '../../datatable/models/can-edit.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  url: string;
  type;
  headers: HeaderModel[];
  fieldsName: string[];
  selectedUser: UserModel;
  canEdit: CanEditModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.type = params.type;
        if (this.type === 'client') {
          this.url = BASE_API + CLIENT
        } else if (this.type === 'delivery-man') {
          this.url = BASE_API + DELIVER_MAN
        } else if ('admin' === this.type) {
          this.url = BASE_API + ADMIN
        }
        console.log(this.url)
        this.selectedUser = null
        // this.show = true
        if (this.type === 'client') {

          this.headers = [
            {
              title: 'first_name',
              searchKey: 'first_name',
              sortKey: 'first_name'
            },
            {
              title: 'last_name',
              searchKey: 'last_name',
              sortKey: 'last_name'
            },
            {
              title: 'email',
              searchKey: 'email',
              sortKey: 'email'
            },
            {
              title: 'phone',
              searchKey: 'phone',
              sortKey: 'phone'
            },
            {
              title: 'address',
              searchKey: 'clientDetails@address',
              sortKey: 'clientDetails@address'
            },
            {
              title: 'city',
              searchKey: 'city',
              sortKey: 'city'
            },
            {
              title: 'zip_code',
              searchKey: 'clientDetails@zip_code',
              sortKey: 'clientDetails@zip_code'
            }
          ];
          this.fieldsName = [
            'first_name',
            'last_name',
            'email',
            'phone',
            'client_details.address',
            'city',
            'client_details.zip_code',
          ]
        } else {
          this.canEdit = {
            editPermission: 'yes',
            editWhere: 'form'
          }
          this.headers = [
            {
              title: 'first_name',
              searchKey: 'first_name',
              sortKey: 'first_name'
            },
            {
              title: 'last_name',
              searchKey: 'last_name',
              sortKey: 'last_name'
            },
            {
              title: 'email',
              searchKey: 'email',
              sortKey: 'email'
            },
            {
              title: 'phone',
              searchKey: 'phone',
              sortKey: 'phone'
            }
          ];
          this.fieldsName = [
            'first_name',
            'last_name',
            'email',
            'phone'
          ]
        }
      });
  }

  ngOnInit(): void {
  }

}
