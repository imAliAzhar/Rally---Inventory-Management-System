import { Material } from './Material';
import { Supplier } from './Supplier';

export class Order {
  material: Material;
  supplier: Supplier;
  quantity: number;
  date: string;
}
