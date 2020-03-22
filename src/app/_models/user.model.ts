import {OrderModel} from './order.model';

export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  token?: string;
  city: string;
  client_details?: {
    address: string,
    zip_code: number,
  };
  orders?: OrderModel[]
}
