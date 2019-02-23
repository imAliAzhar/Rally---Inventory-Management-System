import { Component, OnInit } from '@angular/core';
import { RouteInfo } from './sidebar.metadata';
import { ROUTES } from './sidebar.metadata';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  sideBarItems: RouteInfo[];
  constructor() {}

  ngOnInit() {
    this.sideBarItems = ROUTES.filter(item => item);
  }
}
