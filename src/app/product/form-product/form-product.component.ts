import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../_models/product.model';
import {CrudService} from '../../_services/crud.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BASE_API, CATEGORY, PRODUCT} from '../../_globals/vars';
import {CategoryModel} from '../../_models/category.model';
import {InitilizeJQScriptsService} from '../../_services/initilize-jqscripts.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit, OnChanges {
  productForm: FormGroup;
  productId: string;
  productUrl: string;
  categoryUrl: string;
  categories: CategoryModel []
  private product: ProductModel;
  private selectedImage: any;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private router: Router,
              private route: ActivatedRoute,
              private jqService: InitilizeJQScriptsService) {
    route.params
      .subscribe(params => {
        this.productId = params.id;
        this.productUrl = BASE_API + PRODUCT;
        this.categoryUrl = BASE_API + CATEGORY;
        this.selectedImage = null

      })
  }

  ngOnInit() {
    // this.jqService.initilizeJQScript();
    this.getAllCategories()
    this.initProductForm();
    if (this.productId) {
      this.getOneProduct()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: [this.product ? this.product.name : null, Validators.required],
      description: [this.product ? this.product.description : null, Validators.required],
      price_min: [this.product ? this.product.price_min : null, Validators.required],
      price_max: [this.product ? this.product.price_max : null, Validators.required],
      max_quantity: [this.product ? this.product.max_quantity : null, Validators.required],
      category_id: [this.product ? this.product.category_id : null, Validators.required],
    })
  }

  submitForm() {
    if (!this.productId) {
      this.crud.post(this.productUrl, Object.assign(this.productForm.value, {image: this.selectedImage}), true)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/product'])
        })
    } else {
      this.crud.update(this.productUrl, this.productId, Object.assign(this.productForm.value, this.selectedImage ? {image: this.selectedImage} : null), true)
        .subscribe(data => {
          console.log(data)
          this.router.navigate(['/product'])
        })
    }
  }

  processFile($event) {
    // @ts-ignore
    console.log($event.target.files);
    // @ts-ignore
    this.selectedImage = $event.target.files[0];
  }

  private getAllCategories() {
    this.crud.getAll<CategoryModel[]>(this.categoryUrl)
      .subscribe(categories => {
        this.categories = categories
      })
  }

  private getOneProduct() {
    this.crud.getOne<ProductModel>(this.productUrl, this.productId)
      .subscribe(product => {
        this.product = product
        this.initProductForm()
      })
  }

}
