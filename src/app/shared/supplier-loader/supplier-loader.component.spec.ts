import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLoaderComponent } from './supplier-loader.component';

describe('SupplierLoaderComponent', () => {
  let component: SupplierLoaderComponent;
  let fixture: ComponentFixture<SupplierLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
