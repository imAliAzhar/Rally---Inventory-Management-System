export class Material {
  name: string;
  quantity: number;
  processed: number;
  delivered: number;
  constructor(name: string) {
    this.name = name;
    this.quantity = 0;
    this.processed = 0;
    this.delivered = 0;
  }
}
