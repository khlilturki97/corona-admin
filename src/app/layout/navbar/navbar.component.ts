import { Component, OnInit } from '@angular/core';
import {InitilizeJQScriptsService} from '../../_services/initilize-jqscripts.service';
import {CurrentUserModel} from '../../_models/currentUser.model';
import {AuthenticationService} from '../../_services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: CurrentUserModel;
  constructor(private authService: AuthenticationService,
              private jqService: InitilizeJQScriptsService) { }

  ngOnInit() {
    this.jqService.initilizeJQScript();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      (data: any) => {
        console.log('success on getting current user');
        this.currentUser = new CurrentUserModel(data.id, data.first_name, data.last_name, data.email, data.phone, data.city);
      }, (error) => {
        console.log('error on getting current user ');
        console.log(error);
      }, () => {
        console.log(this.currentUser);
      }
    );
  }



  logout() {
    this.authService.logout();
  }

}
