import {ProductModel} from './product.model';

export class CategoryModel {
  id: string
  name: string
  description: string
  image: string
  products: ProductModel[]
}
