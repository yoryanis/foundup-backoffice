import { Accessory, User } from './index';

export class Report {
  public id: number;
  public accessory?: Accessory;
  public userOwner?: User;
  public details: string;
  public state: boolean;

  constructor(item?: Report) {
    this.id = item && item.id ? item.id : 0;
    this.details = item && item.details ? item.details : '';
    this.state = item && item.state ? item.state : false;
  }
}
