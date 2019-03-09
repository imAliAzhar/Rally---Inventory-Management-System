import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/models/Order';
import { DatabaseService } from '../database/database.service';
import { Material } from 'src/models/Material';
import { Supplier } from 'src/models/Supplier';

interface OrderFormData {
  material: string;
  supplier: string;
  quantity: number;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit, OnDestroy {
  suppliers: Supplier[];
  filteredSuppliers: Supplier[];
  suppliersSubscription: Subscription;
  suppliersLoading = true;

  materials: Material[];
  filteredMaterials: Material[];
  materialsSubscription: Subscription;
  materialsLoading = true;

  orders$: Observable<Order[]>;
  ordersSubscription: Subscription;
  loadingData: boolean;

  isAddNewPanel: boolean;
  selectedOrder: Order;
  selectedOrderIndex: number;

  constructor(private db: DatabaseService) {
    this.orders$ = this.db.getOrders();
    this.selectedOrderIndex = 0;
    this.loadingData = true;
  }

  ngOnInit() {
    this.suppliersSubscription = this.db.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
      this.filteredSuppliers = suppliers;
      this.suppliersLoading = false;
    });

    this.materialsSubscription = this.db.getMaterials().subscribe(materials => {
      this.materials = materials;
      this.filteredMaterials = materials;
      this.materialsLoading = false;
    });

    this.ordersSubscription = this.orders$.subscribe(orders => {
      this.selectedOrder = orders[this.selectedOrderIndex];
      this.loadingData = false;
    });
  }

  ngOnDestroy() {
    this.suppliersSubscription.unsubscribe();
    this.materialsSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }

  onSupplierChange(event) {
    this.filteredSuppliers = this.filter(event.target.value, this.suppliers);
  }

  onMaterialChange(event) {
    this.filteredMaterials = this.filter(event.target.value, this.materials);
  }

  addOrder(orderFormData: OrderFormData) {
    const mat = this.materials.find(material => material.name === orderFormData.material);
    const sup = this.suppliers.find(supplier => supplier.name === orderFormData.supplier);

    const order = new Order();
    order.material = mat;
    order.supplier = sup;
    order.quantity = orderFormData.quantity;

    this.db.addOrder(order);
  }

  removeOrder(order: Order) {
    this.db.removeOrder(order);
  }

  displaySelectedName(selected?: Material | Supplier): string | undefined {
    return selected ? selected.name : undefined;
  }

  filter(value: string, array: Array<any>) {
    const filterValue = value.toLowerCase();
    return array.filter(element => element.name.toLowerCase().includes(filterValue));
  }

  formatDate(date: string) {
    const d = new Date(date);
    return d.toDateString();
  }

  updateSelectedOrder(order: Order, index: number) {
    this.selectedOrder = order;
    this.selectedOrderIndex = index;
  }

  showAddPanel() {
    this.isAddNewPanel = !this.isAddNewPanel;
  }

  scrollToTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
