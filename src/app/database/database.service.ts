import { Supplier } from './../../models/Supplier';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Material } from 'src/models/Material';
import { Order } from 'src/models/Order';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  materialsCollection: AngularFirestoreCollection<Material>;
  suppliersCollection: AngularFirestoreCollection<Supplier>;
  ordersCollection: AngularFirestoreCollection<Order>;

  constructor(private db: AngularFirestore) {
    this.materialsCollection = this.db.collection('materials', ref => ref.orderBy('name'));
    this.suppliersCollection = this.db.collection('suppliers', ref => ref.orderBy('name'));
    this.ordersCollection = this.db.collection('orders', ref => ref.orderBy('date', 'desc'));
  }

  getMaterials(): Observable<Material[]> {
    return this.materialsCollection.valueChanges();
  }

  addMaterial(material: Material) {
    this.materialsCollection.doc(material.name).set({ ...material });
  }

  updateMaterial(material: Material, fields: {}) {
    this.materialsCollection.doc(material.name).update(fields);
  }

  updateMaterialProcessed(material: Material, updatedProcessed: string) {
    this.updateMaterial(material, { processed: updatedProcessed });
  }

  updateMaterialDelivered(material: Material, updatedDelivered: string) {
    this.updateMaterial(material, { delivered: updatedDelivered });
  }

  removeMaterial(material: Material) {
    this.materialsCollection.doc(material.name).delete();
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.suppliersCollection.valueChanges();
  }

  addSupplier(supplier: Supplier) {
    this.suppliersCollection.doc(supplier.name).set({ ...supplier });
  }

  removeSupplier(supplier: Supplier) {
    this.suppliersCollection.doc(supplier.name).delete();
  }

  getOrders(): Observable<Order[]> {
    return this.ordersCollection.valueChanges();
  }

  addOrder(order: Order) {
    const sub = this.materialsCollection
      .doc(order.material.name)
      .get()
      .subscribe(material => {
        console.log('material', material.data());
        const materialData = material.data();
        const updatedQuantity = materialData.quantity + order.quantity;
        this.materialsCollection
          .doc(materialData.name)
          .update({ quantity: updatedQuantity })
          .then(() => {
            order.date = new Date().toLocaleString();
            this.ordersCollection.doc(this.OrderID(order)).set({ ...order });
            sub.unsubscribe();
          });
      });
  }

  removeOrder(order: Order) {
    this.ordersCollection.doc(this.OrderID(order)).delete();
  }

  OrderID(order: Order) {
    return order.material.name + '|' + order.supplier.name + '|' + new Date(order.date).getTime();
  }
}
