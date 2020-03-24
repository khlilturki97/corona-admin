import { Component, OnInit } from '@angular/core';
import {InitilizeJQScriptsService} from '../../_services/initilize-jqscripts.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private jqService: InitilizeJQScriptsService) { }

  ngOnInit() {
    this.jqService.initilizeJQScript();
  }



}
