import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../_models/user.model';
import {InitilizeJQScriptsService} from '../../_services/initilize-jqscripts.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  @Input() user: UserModel;

  constructor(private jqService: InitilizeJQScriptsService) {
  }

  ngOnInit() {
    // this.jqService.initilizeJQScript();
  }

}
