export class Login {
  public email: string;
  public password: string;

  constructor(item: any) {
    this.email = item.email ? item.email : null;
    this.password = item.password ? item.password : null;
  }
}
