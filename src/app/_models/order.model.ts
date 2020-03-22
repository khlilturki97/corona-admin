import {ProductModel} from './product.model';
import {UserModel} from './user.model';

export class OrderModel {
  id: string
  price_min: number
  price_max: number
  status: number
  products: ProductModel[]
  client: UserModel
  delivery_man: UserModel
  created_at: string;
}
