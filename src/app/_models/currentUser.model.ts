export class CurrentUserModel {
  public id: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public phone: string;
  public city: string;

  constructor(id: string, first_name: string, last_name: string, email: string, phone: string, city: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.city = city;
  }
}
