import { Category } from './category.class';

export class Accessory {
  public id: string;
  public category?: Category;
  public description: string;
  public id_unique: string;
  public lost_date: string;
  public lost_place: string;
  public name: string;
  public qr: string;
  public reward: string;
  public state: string;

  constructor(item?: Accessory) {
    this.id = item && item.id ? item.id : '';
    this.description = item && item.description ? item.description : '';
    this.id_unique = item && item.id_unique ? item.id_unique : '';
    this.lost_date = item && item.lost_date ? item.lost_date : '';
    this.lost_place = item && item.lost_place ? item.lost_place : '';
    this.name = item && item.name ? item.name : '';
    this.qr = item && item.qr ? item.qr : '';
    this.reward = item && item.reward ? item.reward : '';
    this.state = item && item.state ? item.state : '';
  }
}
