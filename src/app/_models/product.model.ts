export class ProductModel {
  id: string
  name: string
  pivot?: {
    quantity: number
  }
}
