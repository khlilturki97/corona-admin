import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../../_models/category.model';
import {InitilizeJQScriptsService} from '../../_services/initilize-jqscripts.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {
  @Input() category: any;

  constructor(private jqService: InitilizeJQScriptsService) {
  }

  ngOnInit() {
    // this.jqService.initilizeJQScript();
  }

}
