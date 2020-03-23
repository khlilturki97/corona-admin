import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryModel} from '../../_models/category.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BASE_API, CATEGORY} from '../../_globals/vars';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId;
  type;
  categoryUrl;
  private category: CategoryModel;
  private selectedImage: any;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private router: Router,
              private route: ActivatedRoute) {
    route.params
      .subscribe(params => {
        this.categoryId = params.id;
        this.categoryUrl = BASE_API + CATEGORY;
      })
  }

  ngOnInit() {
    this.initCategoryForm();
    if (this.categoryId) {
      this.getOneCategory()
    }
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      name: [this.category ? this.category.name : null, Validators.required],
      description: [this.category ? this.category.description : null, Validators.required],
    })
  }

  submitForm() {
    if (!this.categoryId) {
      this.crud.post(this.categoryUrl, Object.assign(this.categoryForm.value, {image: this.selectedImage}), true)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/category'])
        })
    } else {
      this.crud.update(this.categoryUrl, this.categoryId, Object.assign(this.categoryForm.value, {image: this.selectedImage}), true)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/category'])
        })
    }
  }

  processFile($event) {
    // @ts-ignore
    console.log($event.target.files);
    // @ts-ignore
    this.selectedImage=$event.target.files[0];
  }

  private getOneCategory() {
    this.crud.getOne<CategoryModel>(this.categoryUrl, this.categoryId)
      .subscribe(category => {
        this.category = category
        this.initCategoryForm()
      })
  }
}
