export class Material {
  name: string;
  unit: string;
  quantity: number;
  processed: number;
  delivered: number;
  constructor(name: string, unit: string) {
    this.name = name;
    this.unit = unit;
    this.quantity = 0;
    this.processed = 0;
    this.delivered = 0;
  }
}
