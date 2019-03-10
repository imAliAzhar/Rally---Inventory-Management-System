import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLoaderComponent } from './order-loader.component';

describe('OrderLoaderComponent', () => {
  let component: OrderLoaderComponent;
  let fixture: ComponentFixture<OrderLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
