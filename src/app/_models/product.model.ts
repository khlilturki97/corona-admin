export class ProductModel {
  id: string
  name: string
  pivot?: {
    quantity: number
  }
  price_max: number;
  price_min: number;
}
