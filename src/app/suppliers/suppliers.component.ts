import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Supplier } from 'src/models/Supplier';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.sass']
})
export class SuppliersComponent implements OnInit, OnDestroy {
  suppliers$: Observable<Supplier[]>;
  suppliersSubscription: Subscription;
  isAddNewPanel: boolean;
  selectedSupplier: Supplier;
  selectedSupplierIndex: number;
  loadingData: boolean;

  constructor(private db: DatabaseService) {
    this.suppliers$ = this.db.getSuppliers();
    this.selectedSupplierIndex = 0;
    this.loadingData = true;
  }

  ngOnInit() {
    this.suppliersSubscription = this.suppliers$.subscribe(suppliers => {
      this.selectedSupplier = suppliers[this.selectedSupplierIndex];
      this.loadingData = false;
    });
  }

  ngOnDestroy() {
    this.suppliersSubscription.unsubscribe();
  }

  updateSelectedSupplier(supplier: Supplier, index: number) {
    this.selectedSupplier = supplier;
    this.selectedSupplierIndex = index;
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
