import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../_models/user.model';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  @Input() user: UserModel

  constructor() {
  }

  ngOnInit() {
  }

}
