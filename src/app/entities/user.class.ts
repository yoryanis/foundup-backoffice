export class User {
  public id?: number;
  public identification: string;
  public name: string;
  public lastname: string;
  public role_id: number;
  public photo?: string;
  public occupation: string;
  public city: string;
  public address: string;
  public birthdate: string;
  public phone: string;
  public email: string;
  public password: string;
  public state: boolean;

  constructor(item?: User) {
    this.id = item && item.id ? item.id : 0;
    this.identification = item && item.identification ? item.identification : '';
    this.name = item && item.name ? item.name : '';
    this.lastname = item && item.lastname ? item.lastname : '';
    this.role_id = item && item.role_id ? item.role_id : 0;
    this.photo = item && item.photo ? item.photo : '';
    this.occupation = item && item.occupation ? item.occupation : '';
    this.city = item && item.city ? item.city : '';
    this.address = item && item.address ? item.address : '';
    this.birthdate = item && item.birthdate ? item.birthdate : '';
    this.phone = item && item.phone ? item.phone : '';
    this.email = item && item.email ? item.email : '';
    this.password = item && item.password ? item.password : '';
    this.state = item && item.state ? item.state : true;
  }
}
