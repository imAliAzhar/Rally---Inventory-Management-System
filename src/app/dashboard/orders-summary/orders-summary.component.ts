import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.sass']
})
export class OrdersSummaryComponent implements OnInit {
  orders: Array<any>;
  constructor() {
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
  }

  ngOnInit() {}
}
