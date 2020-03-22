export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  token?: string;
  client_details?: {
    address: string,
    zip_code: number,
    city: string
  }
}
