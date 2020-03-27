import { Component, OnInit } from '@angular/core';
import {InitilizeJQScriptsService} from '../_services/initilize-jqscripts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private jqService: InitilizeJQScriptsService) { }

  ngOnInit() {
     // this.jqService.initilizeSpinnerScript();
  }

}
