import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Material } from 'src/models/Material';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.sass']
})
export class MaterialsComponent implements OnInit, OnDestroy {
  materials$: Observable<Material[]>;
  materialsSubscription: Subscription;
  barWidth: number;
  isAddNewPanel: boolean;
  selectedMaterial: Material;
  selectedMaterialIndex: number;
  loadingData: boolean;
  date: string;

  constructor(private db: DatabaseService) {
    this.materials$ = this.db.getMaterials();
    this.selectedMaterialIndex = 0;
    this.barWidth = 700;
    this.loadingData = true;
    this.date = new Date().toDateString();
  }

  ngOnInit() {
    this.materialsSubscription = this.materials$.subscribe(
      materials => {
        this.selectedMaterial = materials[this.selectedMaterialIndex];
        if (materials.length != 0) {
          this.loadingData = false;
        }
      },
      error => {
        console.log('error', error);
        this.loadingData = true;
      }
    );
  }

  ngOnDestroy() {
    this.materialsSubscription.unsubscribe();
  }

  updateSelectedMaterial(material: Material, index: number) {
    this.selectedMaterial = material;
    this.selectedMaterialIndex = index;
  }

  renderQuantityBar(material: Material) {
    return 'M 0 0 H ' + this.barWidth.toString();
  }

  renderProcessedBar(material: Material) {
    return 'M 0 0 H ' + (material.processed / material.quantity) * this.barWidth;
  }

  renderDeliveredBar(material: Material) {
    return 'M 0 0 H ' + (material.delivered / material.quantity) * this.barWidth;
  }

  showAddPanel() {
    this.isAddNewPanel = !this.isAddNewPanel;
  }

  addMaterial(form: Material) {
    const material = new Material(form.name, form.unit);
    this.db.addMaterial(material);
  }

  removeMaterial(material: Material) {
    this.db.removeMaterial(material);
  }

  processedChanged(element: Material, input: HTMLInputElement) {
    this.db.updateMaterialProcessed(element, input.value);
  }

  deliveredChanged(element: Material, input: HTMLInputElement) {
    this.db.updateMaterialDelivered(element, input.value);
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
