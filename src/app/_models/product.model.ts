export class ProductModel {
  id: string
  name: string
  description: string
  category_id: string
  pivot?: {
    quantity: number
  }
  price_max: number;
  price_min: number;
  max_quantity: number;
}
