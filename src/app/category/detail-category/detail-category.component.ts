import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../../_models/category.model';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {
  @Input() category: CategoryModel

  constructor() {
  }

  ngOnInit() {
  }

}
