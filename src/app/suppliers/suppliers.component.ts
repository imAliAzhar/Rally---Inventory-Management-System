import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/models/Supplier';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit {
  suppliers$: Observable<Supplier[]>;
  barWidth: number;
  isAddNewPanel: boolean;
  selectedSupplier: Supplier;
  selectedSupplierIndex: number;

  constructor(private db: DatabaseService) {
    this.suppliers$ = this.db.getSuppliers();
    this.selectedSupplierIndex = 0;
    this.barWidth = 700;
  }

  ngOnInit() {
    this.suppliers$.subscribe(suppliers => {
      this.selectedSupplier = suppliers[this.selectedSupplierIndex];
    });
  }

  updateSelectedSupplier(supplier: Supplier, index: number) {
    this.selectedSupplier = supplier;
    this.selectedSupplierIndex = index;
  }

  renderQuantityBar(supplier: Supplier) {
    return 'M 0 0 H ' + this.barWidth.toString();
  }

  removeSupplier(supplier: Supplier) {
    this.db.removeSupplier(supplier);
  }

  numberChanged(element: Supplier, input: HTMLInputElement) {
    this.db.updateSupplierNumber(element, input.value);
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
