import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from 'src/models/Material';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.sass']
})
export class MaterialsComponent implements OnInit {
  materials$: Observable<Material[]>;

  orders: Array<any>;
  isAddNewPanel: boolean;

  constructor(private db: DatabaseService) {
    this.materials$ = this.db.getMaterials();
    const order = {
      material: 'Angle Iron',
      supplier: 'Rana Hamid',
      quantity: 13,
      unit: 'Rods',
      date: new Date().toDateString()
    };
    this.orders = new Array<any>();
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
    this.orders.push(order);
  }

  ngOnInit() {}

  showAddPanel() {
    this.isAddNewPanel = !this.isAddNewPanel;
    console.log('working', this.isAddNewPanel);
  }

  scrollToTop() {
    console.log('scoll');
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
