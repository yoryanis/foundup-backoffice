export class Category {
  public id: number;
  public category: string;

  constructor(item?: Category) {
    this.id = item && item.id ? item.id : 0;
    this.category = item && item.category ? item.category : '';
  }
}
